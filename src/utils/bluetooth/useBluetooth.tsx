import { useRef } from 'react'
import {
  Base64,
  BleManager,
  Characteristic,
  Device,
  LogLevel,
} from 'react-native-ble-plx'
import sleep from '../sleep'
import {
  FirmwareCharacteristic,
  HotspotCharacteristic,
  Service,
} from './bluetoothTypes'

const useBluetooth = () => {
  const instanceRef = useRef<BleManager | null>(null)

  const getBleManager = () => {
    const instance = instanceRef.current
    if (instance !== null) {
      return instance
    }
    const newInstance = new BleManager()
    instanceRef.current = newInstance

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('setting ble log level to verbose')
      instanceRef.current.setLogLevel(LogLevel.Verbose)
    }

    return newInstance
  }

  const getState = async () => getBleManager().state()

  const enable = async () => getBleManager().enable()

  const connect = async (
    hotspotDevice: Device,
  ): Promise<Device | undefined> => {
    return hotspotDevice.connect({ refreshGatt: 'OnConnected' })
  }

  const scan = async (ms: number, callback: (device: Device) => void) => {
    try {
      getBleManager().startDeviceScan(
        [Service.MAIN_UUID],
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            throw error
          }

          if (device?.localName) {
            callback(device)
          }
        },
      )

      await sleep(ms)

      getBleManager().stopDeviceScan()
    } catch (e) {}
  }

  const discoverAllServicesAndCharacteristics = async (
    hotspotDevice: Device,
  ): Promise<Device | undefined> => {
    return hotspotDevice.discoverAllServicesAndCharacteristics()
  }

  const findCharacteristic = async (
    characteristicUuid: HotspotCharacteristic | FirmwareCharacteristic,
    hotspotDevice: Device,
    service: Service = Service.MAIN_UUID,
  ) => {
    const characteristics = await hotspotDevice.characteristicsForService(
      service,
    )
    return characteristics.find((c) => c.uuid === characteristicUuid)
  }

  const readCharacteristic = async (
    characteristic: Characteristic,
  ): Promise<Characteristic> => {
    return characteristic.read()
  }

  const writeCharacteristic = async (
    characteristic: Characteristic,
    payload: Base64,
  ) => {
    return characteristic.writeWithResponse(payload)
  }

  const findAndReadCharacteristic = async (
    characteristicUuid: HotspotCharacteristic | FirmwareCharacteristic,
    hotspotDevice: Device,
    service: Service = Service.MAIN_UUID,
  ) => {
    const characteristic = await findCharacteristic(
      characteristicUuid,
      hotspotDevice,
      service,
    )
    if (!characteristic) return

    const readChar = await readCharacteristic(characteristic)
    return readChar?.value || undefined
  }

  const findAndWriteCharacteristic = async (
    characteristicUuid: HotspotCharacteristic | FirmwareCharacteristic,
    hotspotDevice: Device,
    payload: Base64,
    service: Service = Service.MAIN_UUID,
  ) => {
    const characteristic = await findCharacteristic(
      characteristicUuid,
      hotspotDevice,
      service,
    )
    if (!characteristic) return

    return writeCharacteristic(characteristic, payload)
  }

  return {
    getState,
    enable,
    scan,
    connect,
    discoverAllServicesAndCharacteristics,
    findAndReadCharacteristic,
    findAndWriteCharacteristic,
    readCharacteristic,
    writeCharacteristic,
    findCharacteristic,
  }
}

export default useBluetooth
