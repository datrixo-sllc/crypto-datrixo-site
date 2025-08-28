

package com.datrixo.crypto_datrixo_site.ico_page.service;

import com.datrixo.crypto_datrixo_site.ico_page.contract.DatrixoContract;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.Holder;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.HolderAccount;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.model.User;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.HolderAccountRepository;
import com.datrixo.crypto_datrixo_site.ico_page.mysql.repository.HolderRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.StaticGasProvider;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


/**
 * Created by Yuri Nikiforov.
 * Date: 05.02.2019
 * Time: 13:05

 */

@Service
public class HolderServiceImpl implements HolderService {
    private static final long TOTAL_SUPPLY = 5000;
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private HolderRepository holderRepository;

    @Autowired
    private HolderAccountRepository holderAccountRepository;

    @Autowired
    private Web3j web3j;

    private Credentials credentials;

    private ContractGasProvider contractGasProvider;

    @Value("${wallet.private-key}")
    private String walletPrivateKey;

    @Value("${smart-contract.address}")
    private String smartContractAddress;

    private DatrixoContract datrixoContract;

    private BigInteger totalSupply;
    private List<String> hareholders;



    @Override
    public BigInteger getTotalSupply() {
        return totalSupply;
    }

    @Override
    public void addHolder(Holder holder) {
        holderRepository.save(holder);
    }

    @Override
    public List<Holder> getAll() {
        return holderRepository.findAll();
    }

    @Override
    //@Scheduled(fixedRate = 10000)
    @Transactional
    public void demoProcessing() {
        List<Holder> holders = holderRepository.findAll();
        long totalShareTokens = holders.stream()
                .mapToLong(holder -> holder.getShareTokens().longValue())
                .sum();
        if (totalShareTokens < TOTAL_SUPPLY - 100L) {
            holderRepository.save(new Holder("0xe5b25213d2F1cE8a998B632dc9d6c9719Eb993Ee", new Date(),
                    new BigInteger("100"), BigDecimal.ZERO, 0.0));
        } else {
            holderRepository.deleteAll();
            holderRepository.save(new Holder("0xe5b25213d2F1cE8a998B632dc9d6c9719Eb993Ee", new Date(),
                    new BigInteger("100"), BigDecimal.ZERO, 0.0));
        }
    }



    @PostConstruct
    private void init() {
        try {
            LOGGER.info("Initializing HolderServiceImpl...");
            LOGGER.info("Wallet Private Key length: {}", walletPrivateKey != null ? walletPrivateKey.length() : 0);
            LOGGER.info("Smart Contract Address: {}", smartContractAddress);
            
            credentials = Credentials.create(walletPrivateKey);
            LOGGER.info("Credentials created successfully. Address: {}", credentials.getAddress());
            
            contractGasProvider = new StaticGasProvider(
                    BigInteger.valueOf(20000000000L), // gasPrice
                    BigInteger.valueOf(5000000)       // gasLimit
            );
            LOGGER.info("Gas Provider created - Gas Price: {}, Gas Limit: {}", 
                       contractGasProvider.getGasPrice(), contractGasProvider.getGasLimit());
            
            datrixoContract = DatrixoContract.load(smartContractAddress, web3j, credentials, contractGasProvider);
            LOGGER.info("DatrixoContract loaded successfully");
            
            // Test connection to blockchain
            try {
                BigInteger testTotalSupply = datrixoContract.totalSupply().send();
                LOGGER.info("Test totalSupply call successful: {}", testTotalSupply);
            } catch (Exception e) {
                LOGGER.error("Test totalSupply call failed: {}", e.getMessage(), e);
            }
            
            dbMemoryUpdate();
            
        } catch (Exception e) {
            LOGGER.error("Error during initialization: {}", e.getMessage(), e);
        }
    }


    @Override
    // @Scheduled(fixedRate = 3600000)
    @Scheduled(cron = "0 0 0 * * MON#1,MON#3") // Выполняется в 00:00 в 1-й и 3-й понедельник каждого месяца
    @Transactional
    public void dbMemoryUpdate() {
        try {
            LOGGER.info("Starting dbMemoryUpdate - Contract Address: {}", smartContractAddress);
            LOGGER.info("Credentials Address: {}", credentials.getAddress());
            
            // Проверяем состояние блокчейна
            try {
                org.web3j.protocol.core.methods.response.EthBlockNumber blockNumber = web3j.ethBlockNumber().send();
                LOGGER.info("Current blockchain block number: {}", blockNumber.getBlockNumber());
            } catch (Exception e) {
                LOGGER.warn("Could not get current block number: {}", e.getMessage());
            }
            
            totalSupply = datrixoContract.totalSupply().send();
            LOGGER.info("Total Supply: {}", totalSupply);
            if (totalSupply != null && totalSupply.signum() == 1 ) {
                totalSupply = totalSupply.divide(new BigInteger("100000"));
                LOGGER.info("Adjusted Total Supply: {}", totalSupply);
            }
            
            // Проверяем размер массива холдеров
            checkShareholdersArraySize();
            
            // Попытка получить список холдеров с повторными попытками
            hareholders = getShareholdersWithRetry();
            
            if (hareholders == null || hareholders.isEmpty()) {
                LOGGER.error("Failed to get shareholders list after all retries");
                return;
            }
            
            LOGGER.info("getShareholdersArray() returned {} holders", hareholders.size());
            
            if (hareholders != null) {
                LOGGER.info("First 5 holders: {}", hareholders.stream().limit(5).toList());
                LOGGER.info("Last 5 holders: {}", hareholders.stream().skip(Math.max(0, hareholders.size() - 5)).toList());
            }
            
            holderRepository.deleteAll();
            LOGGER.info("Deleted all existing holders from database");
            
            int processedCount = 0;
            int validHoldersCount = 0;
            
            if (hareholders != null) {
                for (String s : hareholders) {
                    processedCount++;
                    if (!s.equalsIgnoreCase("0x0000000000000000000000000000000000000000")) {
                        validHoldersCount++;
                        try {
                            LOGGER.debug("Processing holder {}: {}", processedCount, s);
                            
                            // Добавляем задержку между запросами для избежания rate limiting
                            if (processedCount > 1) {
                                Thread.sleep(200); // 200ms задержка между запросами
                            }
                            
                            BigInteger balance = processHolderWithRetry(s, "balanceOf");
                            if (balance != null && balance.signum() == 1 ) {
                                balance = balance.divide(new BigInteger("100000"));
                            }
                            
                            double share = 0;
                            if (totalSupply != null && totalSupply.signum() == 1) {
                                share = balance.doubleValue() / totalSupply.doubleValue() * 100d;
                            }
                            
                            BigInteger firstPurchaseTime = processHolderWithRetry(s, "firstPurchaseTime");
                            Date date = new Date(firstPurchaseTime.longValue() * 1000);
                            
                            HolderAccount holderAccount = holderAccountRepository.findFirstByAddress(s);
                            BigDecimal paidPrice = null;
                            if (holderAccount != null) {
                                if (!holderAccount.getInitialInvest()) {
                                    paidPrice = holderAccount.getPaidPrice();
                                } else {
                                    paidPrice = BigDecimal.ZERO;
                                }
                            }
                            
                            Holder holder = new Holder(s, date, balance, paidPrice, share);
                            holderRepository.save(holder);
                            LOGGER.debug("Saved holder: {} with balance: {} and share: {}%", s, balance, share);
                            
                        } catch (Exception e) {
                            LOGGER.error("Error processing holder {}: {}", s, e.getMessage(), e);
                        }
                    } else {
                        LOGGER.debug("Skipping zero address holder: {}", s);
                    }
                }
            }
            
            LOGGER.info("Processing completed. Total holders from contract: {}, Valid holders processed: {}", 
                       hareholders != null ? hareholders.size() : 0, validHoldersCount);

        } catch (Exception e) {
            LOGGER.error("Error in dbMemoryUpdate: {}", e.getMessage(), e);
        }
    }
    
    /**
     * Проверка размера массива холдеров в смарт-контракте
     */
    private void checkShareholdersArraySize() {
        try {
            // Пробуем получить размер массива через getShareholdersArray
            List<String> testArray = datrixoContract.getShareholdersArray().send();
            if (testArray != null) {
                LOGGER.info("Shareholders array size from getShareholdersArray: {}", testArray.size());
                
                // Проверяем первые несколько элементов
                for (int i = 0; i < Math.min(5, testArray.size()); i++) {
                    String addr = testArray.get(i);
                    if (addr != null && !addr.equals("0x0000000000000000000000000000000000000000")) {
                        try {
                            BigInteger balance = datrixoContract.balanceOf(addr).send();
                            LOGGER.info("Holder {} at index {} has balance: {}", addr, i, balance);
                        } catch (Exception e) {
                            LOGGER.warn("Could not get balance for holder {} at index {}: {}", addr, i, e.getMessage());
                        }
                    }
                }
            }
        } catch (Exception e) {
            LOGGER.warn("Could not check shareholders array size: {}", e.getMessage());
        }
    }
    
    /**
     * Получение списка холдеров с повторными попытками
     */
    private List<String> getShareholdersWithRetry() {
        int maxRetries = 5;
        int retryDelayMs = 5000; // 5 секунд
        
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                LOGGER.info("Attempt {} to get shareholders list", attempt);
                List<String> result = datrixoContract.getShareholdersArray().send();
                
                if (result != null && !result.isEmpty()) {
                    LOGGER.info("Successfully got {} shareholders on attempt {}", result.size(), attempt);
                    return result;
                } else {
                    LOGGER.warn("Empty shareholders list received on attempt {}", attempt);
                }
                
            } catch (Exception e) {
                LOGGER.error("Error getting shareholders on attempt {}: {}", attempt, e.getMessage());
            }
            
            if (attempt < maxRetries) {
                try {
                    LOGGER.info("Waiting {} ms before retry...", retryDelayMs);
                    Thread.sleep(retryDelayMs);
                    retryDelayMs *= 2; // Увеличиваем задержку с каждой попыткой
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }
        
        // Если getShareholdersArray() не сработал, пробуем получить холдеров по одному
        LOGGER.info("Falling back to individual shareholder retrieval method");
        return getShareholdersIndividually();
    }
    
    /**
     * Альтернативный метод получения холдеров по одному через функцию shareholders(uint256)
     */
    private List<String> getShareholdersIndividually() {
        List<String> shareholders = new ArrayList<>();
        int maxAttempts = 1000; // Максимальное количество попыток
        int emptyCount = 0;
        int maxEmptyCount = 10; // Максимальное количество пустых адресов подряд
        
        LOGGER.info("Starting individual shareholder retrieval...");
        
        for (int i = 0; i < maxAttempts && emptyCount < maxEmptyCount; i++) {
            try {
                String shareholder = datrixoContract.shareholders(BigInteger.valueOf(i)).send();
                
                if (shareholder != null && !shareholder.equals("0x0000000000000000000000000000000000000000")) {
                    shareholders.add(shareholder);
                    emptyCount = 0; // Сбрасываем счетчик пустых адресов
                    LOGGER.debug("Found shareholder at index {}: {}", i, shareholder);
                } else {
                    emptyCount++;
                    LOGGER.debug("Empty or zero address at index {}: {}", i, shareholder);
                }
                
                // Увеличенная задержка между запросами для избежания rate limiting
                if (i % 5 == 0) {
                    Thread.sleep(500); // 500ms задержка каждые 5 запросов
                } else {
                    Thread.sleep(200); // 200ms задержка между запросами
                }
                
            } catch (Exception e) {
                String errorMessage = e.getMessage();
                
                // Проверяем на rate limiting (429 ошибка)
                if (errorMessage != null && errorMessage.contains("429")) {
                    LOGGER.warn("Rate limiting detected at index {}. Waiting 5 seconds before continuing...", i);
                    try {
                        Thread.sleep(5000); // Ждем 5 секунд при rate limiting
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                } else {
                    LOGGER.error("Error getting shareholder at index {}: {}", i, errorMessage);
                }
                emptyCount++;
            }
        }
        
        LOGGER.info("Individual retrieval completed. Found {} shareholders", shareholders.size());
        return shareholders;
    }
    
    /**
     * Обработка запросов к холдеру с повторными попытками и обработкой rate limiting
     */
    private BigInteger processHolderWithRetry(String address, String method) {
        int maxRetries = 3;
        int baseDelayMs = 1000; // 1 секунда
        
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                BigInteger result = null;
                
                switch (method) {
                    case "balanceOf":
                        result = datrixoContract.balanceOf(address).send();
                        break;
                    case "firstPurchaseTime":
                        result = datrixoContract.firstPurchaseTime(address).send();
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown method: " + method);
                }
                
                return result;
                
            } catch (Exception e) {
                String errorMessage = e.getMessage();
                
                // Проверяем на rate limiting (429 ошибка)
                if (errorMessage != null && errorMessage.contains("429")) {
                    LOGGER.warn("Rate limiting detected for {} on attempt {}. Waiting before retry...", address, attempt);
                    
                    if (attempt < maxRetries) {
                        try {
                            // Экспоненциальная задержка при rate limiting
                            int delayMs = baseDelayMs * (int) Math.pow(2, attempt - 1);
                            LOGGER.info("Waiting {} ms before retry due to rate limiting", delayMs);
                            Thread.sleep(delayMs);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                            break;
                        }
                    }
                } else {
                    LOGGER.error("Error calling {} for address {} on attempt {}: {}", method, address, attempt, errorMessage);
                    
                    if (attempt < maxRetries) {
                        try {
                            Thread.sleep(baseDelayMs);
                        } catch (InterruptedException ie) {
                            Thread.currentThread().interrupt();
                            break;
                        }
                    }
                }
            }
        }
        
        LOGGER.error("Failed to get {} for address {} after {} attempts", method, address, maxRetries);
        return BigInteger.ZERO; // Возвращаем 0 в случае неудачи
    }

    @Override
    public Optional<List<HolderAccount>> findHolderAccountsByUser(User user) {
        return holderAccountRepository.findHolderAccountsByUser(user);
    }

    @Override
    public Optional<HolderAccount> findByAddress(String address) {
        return Optional.ofNullable(holderAccountRepository.findFirstByAddress(address));
    }

    @Override
    public Optional<Holder> findHolderByAddress(String address) {
        return Optional.ofNullable(holderRepository.findFirstByAddress(address));
    }
}
