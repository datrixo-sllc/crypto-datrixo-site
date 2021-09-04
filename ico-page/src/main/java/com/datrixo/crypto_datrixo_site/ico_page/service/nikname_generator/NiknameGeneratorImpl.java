package com.datrixo.crypto_datrixo_site.ico_page.service.nikname_generator;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by Yuri Nikiforov.
 * Date: 04.09.2021
 * Time: 17:23
 **/

@Service
public class NiknameGeneratorImpl implements NiknameGenerator {
    private static final String[] SYMBOLS = {"aeiouy", "bcdfghjklmnpqrstvwxz"};
    private static final int CONSONANS = 3;
    private static final int WOWELS = 1;
    private static final int DIGITS = 4;

    @Override
    public String generate(String keyword) {
        if (keyword == null) {
            keyword = "";
        }
        return prepare(keyword);
    }

    private String prepare(String word) {
        String wrkConsonants = prepareСonsonants(word);
        String wrkWowels = prepareWowels();
        String wrk = concat(wrkConsonants, wrkWowels);
        return wrk + genDigits(word, wrk);
    }

    private String genDigits(String word, String wrk) {
        return StringUtils.right(String.valueOf(Integer.toUnsignedString((word + wrk).hashCode())), DIGITS);
    }

    private String concat(String wrkConsonants, String wrkWowels) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < CONSONANS) {
            sb.append(wrkConsonants.charAt(i));
            if (i < WOWELS) {
                sb.append(wrkWowels.charAt(i));
            }
            i++;
        }
        return sb.toString().toUpperCase();
    }

    private String prepareWowels() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random(SYMBOLS[0].length());
        int i = 0;
        while (i < WOWELS) {
            sb.append(SYMBOLS[0].charAt(i));
            i++;
        }
        return sb.toString();
    }


    private String prepareСonsonants(String word) {
        String wrk = word
                .replaceAll(" ", "")
                .toLowerCase()
                .replaceAll("[" + SYMBOLS[0] + "]", "");
        if (wrk.length() > 1) {
            char[] chars = wrk.toCharArray();
            Set<Character> charSet = new LinkedHashSet<>();
            for (char c : chars) {
                charSet.add(c);
            }
            StringBuilder sb = new StringBuilder();
            for (Character character : charSet) {
                sb.append(character);
            }
            wrk = sb.toString();
        }
        wrk = consonansSymbols(wrk);

        return wrk;
    }

    private String consonansSymbols(String word) {
        String result = word;
        if (result.length() == CONSONANS) {
            return result;
        }
        if (result.length() > CONSONANS) {
            result = shuffle(result).substring(0, CONSONANS);
        }
        if (result.length() < CONSONANS) {
            String inputSymols = null;
            if (result.length() > 0) {
                inputSymols = SYMBOLS[1].replaceAll("[" + result + "]", "");
            } else {
                inputSymols = SYMBOLS[1];
            }
            result = result.concat(Character.toString(inputSymols.charAt(new Random().nextInt(inputSymols.length()))));
        }
        return consonansSymbols(result);
    }

    public String shuffle(String input){
        List<Character> characters = new ArrayList<Character>();
        for(char c:input.toCharArray()){
            characters.add(c);
        }
        StringBuilder output = new StringBuilder(input.length());
        while(characters.size()!=0){
            int randPicker = (int)(Math.random()*characters.size());
            output.append(characters.remove(randPicker));
        }
        return output.toString();
    }


    public static void main(String[] args) {
        NiknameGeneratorImpl gn = new NiknameGeneratorImpl();
        String result = gn.generate("Mark Fedman");
    }


}
