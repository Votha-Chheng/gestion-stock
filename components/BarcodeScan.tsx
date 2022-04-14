import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { BarCodeScannedCallback, BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner'

type BarcodeScanProps = {
  scanned : boolean,
  handleBarCodeScanned : BarCodeScannedCallback
}

const BarcodeScan:FC<BarcodeScanProps> = ({scanned, handleBarCodeScanned}:BarcodeScanProps) => {
  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  )
}

export default BarcodeScan

const styles = StyleSheet.create({

})