import React, {useState} from "react";
import QRCodeInvisible from "../QRCodeInvisible"
import PdfView from "../PdfView"

import {getQrCodeData} from '../../lib/CertificateGenerator';

export default function AttestationView({ route }) {

    const { profile, reasons } = route.params;

    const qrCodeData = getQrCodeData(profile, reasons);
    const [qrCodeBase64, setQrCodeBase64] = useState('');

    return (
        <>
        {qrCodeBase64 === '' && <QRCodeInvisible qrCodeData={qrCodeData} setQrCodeBase64={setQrCodeBase64}/>} 
        <PdfView profile={profile} reasons={reasons} qrCodeBase64={qrCodeBase64}/>
        </>
        )
};