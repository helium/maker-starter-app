export default {
  time: {
    morning: 'Morning',
    evening: 'Evening',
    afternoon: 'Afternoon',
  },
  account_import: {
    alert: {
      body: "This seed phrase doesn't correspond to an account",
      title: 'Error',
    },
    complete: {
      title: 'Recovering Account...',
    },
    confirm: {
      next: 'Submit Seed Phrase',
      subtitle:
        'Here are the 12 words you’ve entered. Tap on any of them if you need to edit.',
      title: 'Please Confirm\nSeed Phrase',
    },
    word_entry: {
      placeholder: '{{ordinal}} word',
      subtitle: 'Recovery Seed Phrases are not\ncase-sensitive',
      title: 'Enter Recovery\nSeed Phrase',
    },
  },
  home: {
    goto: {
      nebra_dashboard: {
        title: 'Advanced Fleet Management',
        external_browser:
          'The dashboard opens in a separate browser window for account security.',
        subtitle:
          'Remotely control and monitor the health of all your Nebra hotspots',
      },
    },
  },
  account_setup: {
    confirm: {
      forgot: 'I forgot my words',
      subtitle:
        'Which word below was your <b><errorText>{{ordinal}} word?</errorText></b>',
      title: 'Confirm\nYour Words',
    },
    confirm_pin: {
      subtitle: 'Re-enter your PIN',
      title: 'Repeat PIN',
    },
    create_pin: {
      subtitle: 'Let’s secure your account with a PIN Code.',
      title: 'Set PIN Code',
    },
    generating: 'GENERATING YOUR 12 WORDS...',
    linkAccount: {
      stepOne: '1. Download the Wallet App',
      stepThree: '3. Come back to this app and sign in.',
      stepTwo: '2. Create account',
    },
    passphrase: {
      next: 'I have written these down',
      subtitle:
        'It is crucial you <b>write all of these\n12 words down, in order</b>.\n\n<errorText>They cannot be recovered.</errorText>',
      title: 'Your 12 Word\nPassword',
    },
    warning: {
      generate: 'Generate my 12 words',
      subtitle:
        'Accounts are protected by\n<b><errorText>12 unique words</errorText></b>, that act as\na password for signing in or\nrecovering accounts.',
      title: 'Creating\nSecure Account.',
    },
    welcome: {
      create_account: 'Create an account on the Helium Network',
      login_with_helium:
        'Already have the Helium Wallet App?\nTap to get started.',
      subtitle:
        'Nebra Hotspot currently supports hotspot onboarding, location assertion, and device transfers.\n\n<b>You must also have the official Helium Wallet App installed in order to continue.</b>',
      title: 'Welcome\nto Nebra',
    },
  },
  antennas: {
    elevation_info: {
      desc: 'Estimate how high the antenna is placed relative to the ground. An antenna located on the roof of a single-story house is typically 5 meters.',
      title: 'Hotspot Height',
    },
    gain_info: {
      desc: 'A value between 1 and 15 to one decimal point. This is provided by your hotspot or antenna manufacturer.',
      title: 'Antenna TX / RX Gain',
    },
    onboarding: {
      dbi: 'dBi',
      elevation: 'Height (meters)',
      gain: 'TX / RX Gain',
      select: 'Select Antenna',
      subtitle: 'Submit antenna and height details for your Hotspot.',
      title: 'Antenna Setup',
    },
  },
  auth: {
    enter_current: 'Enter your current PIN to continue',
    title: 'Enter Your PIN',
  },
  back: 'Back',
  generic: {
    cancel: 'Cancel',
    clear: 'Clear',
    connect: 'Connect',
    continue: 'Continue',
    error: 'Error',
    forget: 'Forget',
    go_to_settings: 'Go to Settings',
    invalid_password: 'You password is incorrect',
    next: 'Next',
    ok: 'OK',
    period: '.',
    scan_again: 'Scan Again',
    search_location: 'Search for an address or place',
    skip: 'Skip',
    something_went_wrong: 'Something went wrong',
    understand: 'I understand',
    unknown: 'Unknown',
    copy: 'Copy',
    address: 'Address',
    hotspot: 'Hotspot',
    owner: 'Owner',
  },
  hotspot_details: {
    no_location_body: 'Pair with the Hotspot to begin.',
    no_location_title: 'No Asserted Location',
    options: {
      settings: 'Settings',
      viewExplorer: 'View on Explorer',
      share: 'Share',
      transfer: 'Transfer Hotspot',
      assert_location: 'Assert Location',
      update_antenna: 'Update Antenna',
    },
  },
  hotspot_settings: {
    wifi: {
      hide_password: 'Hide Password',
      show_password: 'Show Password',
    },
  },
  hotspot_setup: {
    add_hotspot: {
      wait_error_body:
        'Hotspot miner is waiting to start. Please try again in a few minutes.',
      wait_error_title: 'Please Try Again',
    },
    ble_error: {
      enablePairing: 'Enable Pairing Mode',
      pairingInstructions:
        'Refer to manufacturer instructions to enable Bluetooth',
      title: 'No Hotspots Found',
    },
    ble_scan: {
      cancel: 'Cancel Scan',
      title: 'SCANNING FOR HOTSPOTS',
    },
    ble_select: {
      hotspots_found: '{{count}} Hotspot found.',
      hotspots_found_plural: '{{count}} Hotspots found',
      subtitle: 'Select your Hotspot to continue.',
    },
    confirm: {
      mac_address: 'MAC Address',
      owner_address: 'Owner Address',
      public_key: 'Public Key',
      title: 'Confirm\nInformation',
      title_one_line: 'Confirm Information',
    },
    diagnostics: {
      title: 'Diagnostics',
    },
    // TODO
    education: {
      cards: [
        {
          subtitle:
            'Hotspots love places where they can see plenty of sky and spaced at least 300 meters away from other hotspots.',
          title: 'Give me a nice view',
        },
        {
          subtitle:
            "Hotspots shouldn't hide in a nightstand or bookcase. Put it next to a window instead.",
          title: "Don't hide me",
        },
        {
          subtitle: "Nearby buildings may decrease your hotspot's coverage.",
          title: 'Buildings may block my signals',
        },
        {
          subtitle:
            'Try to keep your hotspot away from metal meshes, which can block radio signals dramatically.',
          title: 'Hotspots hate bug screens!',
        },
      ],
      // TODO
      title: 'How to place your hotspot',
    },
    enable_location: {
      cancel: "No thanks, I'll set it up later",
      next: 'Ask for Permissions',
      p_1: 'First, we’ll ask for permission to access your phone’s location.',
      subtitle:
        'We need to set a location for your Hotspot. We can use your phone to do this.',
      title: 'Set Hotspot\nLocation',
    },
    external: {
      qrTitle: 'Scan QR Code',
      wallet_address: 'Your wallet address is:',
      webTitle: 'Web Onboarding',
    },
    firmware_update: {
      current_version: 'Current Version',
      explanation:
        'Your Hotspot will check for updates automatically. This can take about 10 minutes. Leave it plugged in and check back later.',
      next: 'Got it',
      required_version: 'Required Version',
      subtitle: 'Your Hotspot needs a firmware update before you can continue.',
      title: 'Update Available',
    },
    location: {
      next: 'Set Location',
      title: 'Hotspot Location',
    },
    antenna_only_fee: {
      title: 'Antenna Update',
      confirm_antenna:
        'Confirm the antenna gain and elevation selected is correct.',
      fee_antenna: 'Pay Fee & Update Antenna',
      no_location_asserted: {
        title: 'Location Not Asserted',
        message:
          'You are yet to assert any location for this hotspot. Please assert location first',
        ok: 'OK',
      },
    },
    location_fee: {
      balance: 'Balance:',
      confirm_location:
        'Confirm the location selected is correct and register or update your Hotspot.',
      elevation: '{{count}} meter',
      elevation_label: 'Height:',
      elevation_plural: '{{count}} meters',
      fee: 'Fee:',
      fee_register: 'Pay Fee & Register Hotspot',
      fee_assert: 'Pay Fee & Assert Location',
      gain: '{{gain}} dBi',
      gain_label: 'TX / RX Gain:',
      next: 'Register Hotspot',
      fee_next: 'Pay & Register',
      assert: 'Assert Location',
      no_funds: 'There is insufficient funds in your account balance',
      subtitle_fee:
        'You need to pay a $10 Location Fee (in DC) to confirm this location.',
      subtitle_free: 'Your Location Fee ($10) has been prepaid.',
      title: 'Location Fee',
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
      something_went_wrong: 'something went wrong',
      unknown_error: {
        title: 'Transaction Error',
        subtitle: 'Try later. blockchain or server might be down',
      },
    },
    owned_hotspot: {
      subtitle_1: 'Looks like this Hotspot is already onboarded.',
      subtitle_2:
        'To update your Hotspot’s Wi-Fi or location, go to your Hotspot’s Settings.',
      title: 'You already own this Hotspot',
    },
    pair: {
      alert_ble_off: {
        body: 'To start pairing, turn on Bluetooth. Keep Bluetooth on until you finish registration.',
        title: 'Enable Bluetooth',
      },
      alert_no_permissions: {
        body: 'The Nebra Hotspot App needs permission to use Bluetooth. You can enable Bluetooth permission in Settings.',
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
      title: 'REGISTERING TRANSACTION',
    },
    onboard: {
      next: 'Show My Hotspots',
      subtitle:
        'Press the button below to view your hotspots. But be patient, it can take a few minutes for your new hotspot to show',
      title: 'REGISTERING HOTSPOT',
    },
    update: {
      next: 'Show My Hotspots',
      subtitle:
        'Press the button below to view your hotspots. But be patient, it can take a few minutes for your new update to show',
      title: 'UPDATING HOTSPOT',
    },
    selection: {
      subtitle: 'Select the hotspot type below:',
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
  hotspotAssertAddress: {
    enterHotspot: 'Enter Hotspot Address',
    title: 'Assert Location',
  },
  hotspots: {
    view_activity: 'After adding a Hotspot, you can view your account on the ',
    explorer: 'Helium Explorer',
    owned: {
      title: 'My Hotspots',
      title_no_hotspots: 'Hotspots',
      hotspot_plural: 'You have {{count}} Hotspot(s)',
      hotspot: 'Hotspot',
    },
    loading_error: 'Unable to fetch information',
    list: {
      no_offline: 'NO OFFLINE HOTSPOTS',
      online: 'ONLINE HOTSPOTS',
      no_results: 'No Results',
      devices: 'HOTSPOTS',
    },
    notOnboarded: 'This hotspot has not been onboarded',
    empty: {
      body: 'Follow these instructions to setup your hotspot.',
      hotspots: {
        add: 'Add Hotspot',
        assertLocation: 'Assert Location',
        transfer: 'Transfer Hotspot',
        updateWifi: 'Update WiFi',
      },

      title: 'Nebra Hotspot Setup',
    },
    title: 'Your Hotspots',
  },
  learn: {
    next: 'Next',
  },
  more: {
    sections: {
      app: {
        language: 'Language',
        signOut: 'Sign Out',
        signOutAlert: {
          body: 'You are signing out of your account.',
          title: 'Warning!',
        },
        signOutWithLink: 'Sign Out - Linked as: {{address}}',
        title: 'App',
      },
      security: {
        authIntervals: {
          after_1_hr: 'After 1 hour',
          after_1_min: 'After 1 minute',
          after_4_hr: 'After 4 hours',
          after_5_min: 'After 5 minutes',
          after_15_min: 'After 15 minutes',
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
        'The Nebra Hotspot App needs access to your location for Bluetooth discovery and to enable location assertion. This information will never be sold or shared.',
      title: 'Location Permission',
    },
  },
  transferHotspot: {
    enterHotspot: 'Enter Hotspot Address Here',
    enterOwner: 'Enter New Owner Address Here',
    submit: 'Sign with Helium App',
    submitComplete: 'Transfer Successfully Submitted!\n Pending Txn Hash:',
    title: 'Transfer Hotspot',
  },
  wallet: {
    copiedToClipboard: 'Copied {{address}} to clipboard',
    checkLink: {
      title: 'Update required',
      message:
        "You're currently linked to the Helium Hotspot app. You must download the Helium Wallet App and update your link",
      link: 'Link to Helium Wallet App',
    },
  },
}
