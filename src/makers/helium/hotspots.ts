import HotspotIcon from '@assets/images/hotspot.svg'
import { MakerHotspot } from '../hotspotMakerTypes'
import ANTENNAS from './antennas'

const Helium = {
  name: 'Helium Hotspot',
  icon: HotspotIcon,
  onboardType: 'BLE',
  translations: {
    en: {
      internal: [
        {
          title: 'Diagnostic',
          body: '<b>Diagnostic support allows Helium to identify issues with your Hotspot in a secure way.</b>\n\nHelium will never have access to private keys and will only ever be able to access your Hotspot and not any other devices on your Network.\n\nIf you would like to opt-out of diagnostic support please email <b>support@helium.com</b> from the email used to purchase the Hotspot.',
          button: 'Next',
        },
        {
          title: 'Power',
          body: 'Attach the antenna and plug in the provided power adapter.\n\nYour Hotspot will boot up, and its light will become Green when ready.',
          button: 'Next',
        },
        {
          title: 'Bluetooth',
          body: "Press the black button on your Hotspot. Its light should turn blue. Ensure your phone's bluetooth is on before proceeding",
          button: 'Next',
        },
      ],
      externalOnboard: [],
    },
    ja: {
      internal: [
        {
          title: '診断',
          body: '<b>診断サポートにより、HeliumはHotspotの問題を安全な方法で特定できます。</b>\n\nHeliumが秘密キーにアクセスすることはありません。お使いのHotspotにのみアクセスし、ネットワーク上の他のデバイスにはアクセスしません。\n\n診断サポートをオプトアウトする場合は、Hotspotの購入時に使用したメールアドレスを使用して、<b>support@helium.com</b>までメールでご連絡ください。',
          button: '電源が入っています',
        },
        {
          title: '電源オン',
          body: 'アンテナを取り付け、付属の電源アダプターに差し込みます。\n\nHotspotが起動し、準備が完了するとライトが緑色になります。',
          button: '電源が入っています',
        },
        {
          title: 'Bluetooth',
          body: 'Hotspotの黒いボタンを押します。ライトが青に変わります。\n\n続行する前に携帯電話のBluetoothがオンになっていることを確認します',
          button: '電源が入っています',
        },
      ],
      externalOnboard: [],
    },
    ko: {
      internal: [
        {
          title: '진단 도구',
          body: '<b>Helium은 진단 지원을 통해 안전한 방법으로 Hotspot에서 발생하는 문제를 식별할 수 있습니다.</b>\n\nHelium은 개인 키에 대한 액세스 권한이 없으며 네트워크 내의 다른 기기를 제외하고 Hotspot에만 액세스할 수 있습니다.\n\n진단 지원을 선택 취소하려면 Hotspot을 구매할 때 사용한 이메일을 통해 <b>support@helium.com</b>으로 이메일을 보내주시기 바랍니다.',
          button: '전원을 켰습니다',
        },
        {
          title: '전원 켜기',
          body: '안테나를 부착하고 제공된 전원 어댑터에 연결합니다.\n\nHotspot이 부팅되고 준비되면 표시등이 녹색으로 바뀝니다.',
          button: '전원을 켰습니다',
        },
        {
          title: 'Bluetooth',
          body: 'Hotspot에서 검은색 버튼을 누르세요. 표시등이 파란색으로 바뀝니다.\n\n계속하기 전에 휴대전화의 Bluetooth가 켜져 있는지 확인하세요',
          button: '전원을 켰습니다',
        },
      ],
      externalOnboard: [],
    },
    zh: {
      internal: [
        {
          title: '诊断',
          body: '<b>Hotspot 诊断支持帮助 Helium 安全确认您的 Hotspot 问题。</b>\n\nHelium 绝不会访问私人密钥，且仅可访问您的 Hotspot，无法访问您网络中的任何其他设备。\n\n若选择退出诊断支持，请使用购买 Hotspot 时提供的电子邮箱发送请求至 <b>support@helium.com</b>。',
          button: '我已开机',
        },
        {
          title: '开机',
          body: '连接天线，插接随附的电源适配器。\n\n您的 Hotspot 将随即启动，就绪后会亮起绿色指示灯。',
          button: '我已开机',
        },
        {
          title: 'Bluetooth',
          body: '按下 Hotspot 上的黑色按钮。指示灯应变成蓝色。\n继续操作之前，请确保您手机上的蓝牙已开启',
          button: '我已开机',
        },
      ],
      externalOnboard: [],
    },
  },
  antenna: {
    us: ANTENNAS.HELIUM_US,
    default: ANTENNAS.HELIUM_EU,
  },
} as MakerHotspot

export default { Helium }
