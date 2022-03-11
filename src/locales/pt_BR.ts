export default {
  account_setup: {
    confirm_pin: {
      subtitle: 'Insira novamente seu PIN',
      title: 'Reinsira o PIN',
    },
    create_pin: {
      subtitle: 'Deixe sua conta mais segura com um PIN',
      title: 'Configurar PIN de segurança',
    },
    welcome: {
      create_account: 'Criar uma conta na Rede Helium',
      login_with_helium: 'Já tem uma carteira Helium?\nAperte aqui.',
      subtitle:
        'Lorem ipsum <b><errorText>$HNT</errorText></b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      title: 'Bem vindo\nao app da Illios',
    },
    linkAccount: {
      stepOne: '1. Download a supported Wallet App',
      stepTwo: '2. Criar uma conta',
      stepThree: '3. Volte ao app e vincule sua conta',
    },
    createAccount: {
      signInWith: 'Entrar com:',
    },
  },
  antennas: {
    elevation_info: {
      desc:
        'Estimate how high the antenna is placed relative to the ground. An antenna located on the roof of a single-story house is typically 5 meters.',
      title: 'Hotspot Height',
    },
    gain_info: {
      desc:
        'A value between 1 and 15 to one decimal point. This is provided by your hotspot or antenna manufacturer.',
      title: 'Antenna TX / RX Gain',
    },
    onboarding: {
      dbi: 'dBi',
      elevation: 'Altura (metros)',
      gain: 'Ganho TX / RX',
      select: 'Select Antenna',
      subtitle: 'Submit antenna and height details for your Hotspot.',
      title: 'Antenna Setup',
    },
  },
  auth: {
    enter_current: 'Insira seu PIN atual',
    title: 'Insira seu PIN',
  },
  back: 'Voltar',
  generic: {
    cancel: 'Cancelar',
    clear: 'Limpar',
    connect: 'Conectar',
    continue: 'Continuar',
    error: 'Error',
    forget: 'Esquecer',
    go_to_settings: 'Ir para Configurações',
    invalid_password: 'Sua senha está incorreta',
    next: 'Próximo',
    ok: 'OK',
    scan_again: 'Scan Again',
    search_location: 'Search for an address or place',
    skip: '[skip button]',
    something_went_wrong: 'Algo deu errado',
    understand: 'Eu entendo',
    unknown: 'Desconhecido',
    period: '.',
  },
  hotspot_details: {
    no_location_body: 'Pair with the Hotspot to begin.',
    no_location_title: 'No Asserted Location',
  },
  hotspot_settings: {
    wifi: {
      hide_password: 'Esconder senha',
      show_password: 'Mostrar senha',
    },
  },
  hotspot_setup: {
    add_hotspot: {
      wait_error_body:
        'Hotspot miner is waiting to start. Please try again in a few minutes.',
      wait_error_title: 'Por favor, tente mais tarde',
    },
    ble_error: {
      enablePairing: 'Enable Pairing Mode',
      pairingInstructions:
        'Refer to manufacturer instructions to enable Bluetooth',
      title: 'Nenhum Hotspot Encontrado',
    },
    ble_scan: {
      cancel: 'Cancelar Scan',
      title: 'PROCURANDO HOTSPOTS',
    },
    ble_select: {
      hotspots_found: '{{count}} Hotspot encontrado.',
      hotspots_found_plural: '{{count}} Hotspots encontrados.',
      subtitle: 'Escolha o seu Hotspot para continuar.',
    },
    confirm: {
      mac_address: 'Endereço MAC',
      owner_address: 'Owner Address',
      public_key: 'Chave Pública',
      title: 'Confirmar\nInformação',
      title_one_line: 'Confirmar Informação',
    },
    diagnostics: {
      title: 'Diagnósticos',
    },
    education: {
      cards: [
        {
          subtitle: '[Placeholder]',
          title: '[Placeholder]',
        },
        {
          subtitle: '[Placeholder]',
          title: '[Placeholder]',
        },
        {
          subtitle: '[Placeholder]',
          title: '[Placeholder]',
        },
        {
          subtitle: '[Placeholder]',
          title: '[Placeholder]',
        },
      ],
      title: '[Your Hotspot\nSetup Instructions]',
    },
    enable_location: {
      cancel: 'Não obrigado, configurarei mais tarde',
      next: 'Pedir permissão',
      p_1: 'Primeiro, precisamos da localização do seu dispositivo.',
      subtitle:
        'We need to set a location for your Hotspot. We can use your phone to do this.',
      title: 'Configurar Hotspot\nLocalização',
    },
    external: {
      qrTitle: 'Escanear o QR Code',
      wallet_address: 'O endereço da sua carteira é:',
      webTitle: 'Web Onboarding',
    },
    firmware_update: {
      current_version: 'Versão atual',
      explanation:
        'Seu Hotspot se atualiza automaticamente. Isso pode demorar uns 10 minutos. Deixe o dispositivo ligado e cheque mais tarde.',
      next: 'Entendi',
      required_version: 'Versão necessária',
      subtitle: 'Seu hotspot precisa ser atualizado para continuar.',
      title: 'Atualização disponível',
    },
    location: {
      next: 'Configurar Localização',
      title: 'Localização Hotspot',
    },
    location_fee: {
      balance: 'Saldo:',
      confirm_location:
        'Confirme se o local selecionado está correto e cadastre seu Hotspot.',
      elevation: '{{count}} metro',
      elevation_label: 'Height:',
      elevation_plural: '{{count}} metros',
      fee: 'Taxa:',
      fee_next: 'Pagar taxa & Cadastrar Hotspot',
      gain: '{{gain}} dBi',
      gain_label: 'TX / RX Ganho:',
      next: 'Cadastrar Hotspot',
      no_funds: 'Não há saldo suficiente HNT no saldo da sua conta',
      subtitle_fee:
        'Você precisa pagar uma taxa de $10 (em DC) para confirmar a localização.',
      subtitle_free: 'Sua taxa de localização ($10) já foi paga.',
      title: 'Taxa de Localização',
    },
    not_owner: {
      contact_manufacturer:
        'If you think you are the Hotspot Owner (i.e. you bought it) contact the Hotspot manufacturer.',
      subtitle_1_no_follow:
        "If you're a Host updating Wi-Fi, you may exit setup now.",
      title: 'This Hotspot already has an owner.',
    },
    onboarding_error: {
      disconnected:
        'There was an error connecting to the Hotspot. Please try again.',
      next: 'Exit Setup',
      title: 'Onboarding Error',
    },
    owned_hotspot: {
      subtitle_1: 'Looks like this Hotspot is already onboarded.',
      subtitle_2:
        'To update your Hotspot’s Wi-Fi or location, go to your Hotspot’s Settings.',
      title: 'You already own this Hotspot',
    },
    pair: {
      alert_ble_off: {
        body:
          'To start pairing, turn on Bluetooth. Keep Bluetooth on until you finish registration.',
        title: 'Enable Bluetooth',
      },
      alert_no_permissions: {
        body:
          'MakerApp needs permission to use Bluetooth. You can enable Bluetooth permission in Settings.',
        title: 'Authorize Bluetooth',
      },
      scan: 'Scan for my Hotspot',
      title: 'Bluetooth',
    },
    power: {
      next: "I'm powered up",
      title: 'Power Up',
    },
    progress: {
      next: 'Go to Wallet',
      subtitle:
        'This can take a few minutes so feel free to close this screen.',
      title: 'REGISTERING HOTSPOT',
    },
    selection: {
      subtitle: '[Placeholder instructions]',
      title: 'Add\nyour Hotspot.',
    },
    skip_location: {
      subtitle_1: 'You have decided to assert location later.',
      subtitle_2: 'Update your location later from settings.',
      title: 'Add Hotspot',
    },
    wifi_password: {
      connecting: 'Connecting to Network',
      join_title: 'Enter Password',
      placeholder: 'Password',
      subtitle:
        'Enter your Wi-Fi’s credentials to connect your Hotspot to this Network.',
    },
    wifi_scan: {
      available_networks: 'Available Networks',
      disconnect: 'Forget Network',
      ethernet: 'Use Ethernet Instead',
      not_found_desc:
        'It can take up to 3 minutes for the Hotspot to boot and find available networks.',
      not_found_title: 'No Wi-Fi Networks Found',
      saved_networks: 'Configured Network',
      scan_fail_subtitle:
        'Your Hotspot has found no Wi-Fi networks nearby. Check your router is online and nearby.',
      scan_networks: 'Scan Networks',
      settings_title: 'Wi-Fi Settings',
      subtitle:
        'Select the Wi-Fi network you’d like your Hotspot to connect to.',
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    view_activity: 'After adding a Hotspot, you can view your account on the ',
    explorer: 'Helium Explorer',
    empty: {
      body: 'Your add hotspot\ninstructions',
      hotspots: {
        add: 'Add Hotspot',
        assertLocation: 'Assert Location',
        transfer: 'Transfer Hotspot',
      },
      title: 'Add a\n[Placeholder] Miner',
    },
  },
  learn: {
    next: '[next button]',
  },
  more: {
    sections: {
      app: {
        language: 'Language',
        signOut: 'Sign Out',
        signOutWithLink: 'Sign Out - Linked as: {{address}}',
        signOutAlert: {
          body: 'You are signing out of your account.',
          title: 'Warning!',
        },
        title: 'App',
      },
      security: {
        authIntervals: {
          after_15_min: 'After 15 minutes',
          after_1_hr: 'After 1 hour',
          after_1_min: 'After 1 minute',
          after_4_hr: 'After 4 hours',
          after_5_min: 'After 5 minutes',
          immediately: 'Immediately',
        },
        enablePin: 'Enable PIN',
        requirePin: 'Require PIN',
        resetPin: 'Reset PIN',
        title: 'Security',
      },
    },
    title: 'Settings',
  },
  ordinals: [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ],
  permissions: {
    location: {
      message:
        'MakerApp needs access to your location for Bluetooth discovery and to enable location assertion. This information will never be sold or shared.',
      title: 'Location Permission',
    },
  },
  wallet: {
    copiedToClipboard: 'Copied {{address}} to clipboard',
  },
  transferHotspot: {
    title: 'Transfer Hotspot',
    enterHotspot: 'Enter Hotspot Address',
    enterOwner: 'Enter New Owner Address',
    submit: 'Submit Transaction',
    submitComplete: 'Transfer Successfully Submitted!\n Pending Txn Hash:',
  },
}
