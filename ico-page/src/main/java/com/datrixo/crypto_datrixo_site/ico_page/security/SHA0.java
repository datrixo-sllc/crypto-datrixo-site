package com.datrixo.crypto_datrixo_site.ico_page.security;
/*
 * $Id: SHA0.java,v 1.5 1998/10/19 05:31:46 leachbj Exp $
 * $Author: leachbj $
 *
 * Copyright (C) 1996-1998 Australian Business Access Pty Ltd.
 * All rights reserved.
 *
 * Use, modification, copying and distribution of this software is subject the
 * terms and conditions of the ABA Public Licence. See the file
 * "PUBLIC_LICENCE" for additional information.
 *
 * If you have not received a copy of the Public Licence, you must destroy all
 * copies of this file immediately.
 *
 * $Source: /aba/CVSROOT/jdk1.1/src/au.net.aba/crypto/provider/SHA0.java,v $
 * $Revision: 1.5 $
 * $Date: 1998/10/19 05:31:46 $
 * $State: Exp $
 */

import java.security.MessageDigest;

/**
 * A class that implements the NIST Secure Hash Algorithm - version 0.
 */
public class SHA0 extends MessageDigest
{
    public final static String ident = "$Id: SHA0.java,v 1.5 1998/10/19 05:31:46 leachbj Exp $";

    private int count;
    private int H1, H2, H3, H4, H5;
    private int[]   X;
    private byte[]  buffer;

    //==================================
    // Private implementation
    //==================================

    // the size of the digest in this case will always be 160 bits.
    public final static int     DIGEST_LEN = 20;

    /*
     * if true we use SHA-1 not SHA-0
     */
    private final static boolean    updatedVersion = false; // SHA-0

    // where we store the intermediate digest data.
    private int[]           sha = new int[DIGEST_LEN/4];
    private boolean         sha_done;

    // Magic constants
    static final int    Y1 = 0x5a827999;
    static final int    Y2 = 0x6ed9eba1;
    static final int    Y3 = 0x8f1bbcdc;
    static final int    Y4 = 0xca62c1d6;

    /**
     * basic constructor.
     */
    public SHA0()
    {
        super("SHA-1");

        X = new int[80];
        buffer = new byte[64];

        engineReset();
    }
    /*
     * private converters
     */

    private final int bytesToInt(
        byte[]  bytes,
        int offset)
    {
        return ((bytes[offset + 0] << 24) & 0xff000000) |
            ((bytes[offset + 1] << 16) & 0x00ff0000) |
            ((bytes[offset + 2] <<  8) & 0x0000ff00) |
            ((bytes[offset + 3] <<  0) & 0x000000ff);

    }
    private final int circularRotate(
        int x,
        int n)
    {
        return (x << n) | (x >>> (32 - n));
    }
    /**
     * compute the digest and reset the engine.
     *
     * @return the digest as a byte array.
     */
    protected synchronized byte[] engineDigest()
    {
        long    bitLength;

        bitLength = count << 3;

        engineUpdate((byte)128);
        while ((int)(count & 63) != 56)
            engineUpdate((byte)0);

        // convert byte buffer to int buffer.
        for (int i = 0; i < 14; i++)
        {
            X[i] = bytesToInt(buffer, i * 4);
        }

        /*
         * add the length in bits
         */
        X[14] = (int)(bitLength >>> 32);
        X[15] = (int)(bitLength & 0xffffffff);

        processBlock();

        /*
         * convert into byte array
         */
        byte[]  digest;

        digest = new byte[20];

        intToBytes(digest, 0, H1);
        intToBytes(digest, 4, H2);
        intToBytes(digest, 8, H3);
        intToBytes(digest, 12, H4);
        intToBytes(digest, 16, H5);

        engineReset();

        return digest;
    }
    /*
     * MessageDigest methods.
     */

    /**
     * reset the digest back to its original state.
     */
    protected void engineReset()
    {
        H1 = 0x67452301;
        H2 = 0xefcdab89;
        H3 = 0x98badcfe;
        H4 = 0x10325476;
        H5 = 0xc3d2e1f0;

        count = 0;
    }
    /**
     * add a block of data from the array bytes, to the message
     * digest. The block starts offset bytes into the array and is
     * of size length.
     *
     * @param bytes     the byte array.
     * @param offset    offset into the array to start from.
     * @param length    size of the block.
     */
    protected synchronized void engineUpdate(
        byte[]  bytes,
        int offset,
        int length)
    {
        int index;

        index = offset;

        /*
         * fill the current block
         */
        while (!((count & 63) == 63) && length > 0)
        {
            engineUpdate(bytes[index++]);
            length--;
        }

        if (length == 0)
        {
            return;
        }

        engineUpdate(bytes[index++]);
        length--;

        /*
         * process as many whole blocks as we can
         */
        while (length > 64)
        {
            // convert byte buffer to int buffer.
            for (int i = 0; i < 16; i++)
            {
                X[i] = bytesToInt(bytes, index);
                index += 4;
            }

            count += 64;
            length -= 64;

            processBlock();
        }

        /*
         * process the tail fragment
         */
        for (int i = 0; i != length; i++)
        {
            engineUpdate(bytes[i + index]);
        }
    }
    /**
     * update the digest with a single byte
     *
     * @param b the byte to be added.
     */
    protected synchronized void engineUpdate(
        byte    b)
    {
        buffer[count & 63] = b;

        if ((count & 63) == 63)
        {
            // convert byte buffer to int buffer.
            for (int i = 0; i < 16; i++)
            {
                X[i] = bytesToInt(buffer, i * 4);
            }

            processBlock();
        }

        count++;
    }
    private final int f(
        int u,
        int v,
        int w)
    {
        return ((u & v) | ((~u) & w));
    }
    private final int g(
        int u,
        int v,
        int w)
    {
        return ((u & v) | (u & w) | (v & w));
    }
    private final int h(
        int u,
        int v,
        int w)
    {
        return (u ^ v ^ w);
    }
    private final void intToBytes(
        byte[]  bytes,
        int offset,
        int val)
    {
        bytes[offset + 0] = (byte)((val >>> 24) & 0xff);
        bytes[offset + 1] = (byte)((val >>> 16) & 0xff);
        bytes[offset + 2] = (byte)((val >>> 8) & 0xff);
        bytes[offset + 3] = (byte)((val >>> 0) & 0xff);
    }
    private void processBlock()
    {
        int A, B, C, D, E, t;

        if (!updatedVersion)
        {
            for (int i = 16; i <= 79; i++)
            {
                X[i] = X[i - 3] ^ X[i - 8]
                        ^ X[i - 14] ^ X[i - 16];
            }
        }
        else
        {
            for (int i = 16; i <= 79; i++)
            {
                t = X[i - 3] ^ X[i - 8]
                        ^ X[i - 14] ^ X[i - 16];

                X[i] = circularRotate(t, 1);
            }
        }

        // the start of the SHA itself
        A = H1;
        B = H2;
        C = H3;
        D = H4;
        E = H5;

        /*
         * round 1
         */
        for (int j = 0; j <= 19; j++)
        {
            t = circularRotate(A, 5) + f(B, C, D) + E + X[j] + Y1;

            E = D;
            D = C;
            C = circularRotate(B, 30);
            B = A;
            A = t;
        }

        /*
         * round 2
         */
        for (int j = 20; j <= 39; j++)
        {
            t = circularRotate(A, 5) + h(B, C, D) + E + X[j] + Y2;

            E = D;
            D = C;
            C = circularRotate(B, 30);
            B = A;
            A = t;
        }

        /*
         * round 3
         */
        for (int j = 40; j <= 59; j++)
        {
            t = circularRotate(A, 5) + g(B, C, D) + E + X[j] + Y3;

            E = D;
            D = C;
            C = circularRotate(B, 30);
            B = A;
            A = t;
        }

        /*
         * round 4
         */
        for (int j = 60; j <= 79; j++)
        {
            t = circularRotate(A, 5) + h(B, C, D) + E + X[j] + Y4;

            E = D;
            D = C;
            C = circularRotate(B, 30);
            B = A;
            A = t;
        }

        H1 += A;
        H2 += B;
        H3 += C;
        H4 += D;
        H5 += E;
    }
}

