package com.datrixo.crypto_datrixo_site.ico_page.service.password_generator;

import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created by Yuri Nikiforov.
 * Date: 10.09.2021
 * Time: 14:33
 **/
@Service
public class PasswordGeneratorImpl implements PasswordGenerator {
    @Override
    public String generate() {
        StringBuilder result = new StringBuilder();
        String[] passwords = new String[] {
                "ALKJVBPIQYTUIWEBVPQALZVKQRWORTUYOYISHFLKAJMZNXBVMNFGAHKJSDFALAPOQIERIUYTGSFGKMZNXBVJAHGFAKX",
                "1234567890",
                "qpowiealksdjzmxnvbfghsdjtreiuowiruksfhksajmzxncbvlaksjdhgqwetytopskjhfgvbcnmzxalksjdfhgbvzm",
                ".@,-+/()#$%^&*!"
        };
        long passwordLength = Math.abs(UUID.randomUUID().getLeastSignificantBits() % 8) + 8;
        for (int index = 0; index < passwordLength; index += 1) {
            int passIndex = (int) (passwords.length * index / passwordLength);
            int charIndex = (int) Math.abs(UUID.randomUUID().getLeastSignificantBits() % passwords[passIndex].length());
            result.append(passwords[passIndex].substring(charIndex, charIndex + 1));
        }
        return result.toString();
    }

    public static void main(String[] args) {
        PasswordGenerator generator = new PasswordGeneratorImpl();
        System.out.println(generator.generate());
    }
}
