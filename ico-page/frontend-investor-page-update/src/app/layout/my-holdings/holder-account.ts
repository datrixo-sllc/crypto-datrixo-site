import { SignedDocument } from "../signed-documents/signed-document";

export class HolderAccount {
    address: string;
    userId: number;
    createDate: Date;
    paidPrice: string;
    initialInvest: boolean;
    signedDocuments: SignedDocument[] = [];
}