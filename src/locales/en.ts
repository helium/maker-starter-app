export default {
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
    revealPrivateKey: {
      alertMessage:
        "This will access and display your private key from your device's secure storage",
      alertTitle: 'Are you sure?',
      done: 'Done',
      subtitle:
        '<secondaryText>Do not share your private key!</secondaryText><red>\n\nIf someone has your private key they will have full control of your wallet!</red>',
      tap: 'Tap to reveal your private key',
      tapCopy: 'Tap to copy. Your private key is:',
      title: 'Your Private Key',
      privateKey: 'private key',
      export: 'Export to Wallet App',
      download: 'Download Wallet App',
      passMessage:
        'Enter a password to secure your private key. You will need to enter this again in Wallet App.',
      inputPlaceholder: 'Enter Password',
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
        'Lorem ipsum <b><errorText>$HNT</errorText></b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      title: 'Welcome\nto Helium',
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
    unavailable: 'Unavailable',
    understand: 'I understand',
    unknown: 'Unknown',
  },
  hotspot_details: {
    no_location_body: 'Pair with the Hotspot to begin.',
    no_location_title: 'No Asserted Location',
  },
  hotspot_settings: {
    wifi: {
      hide_password: 'Hide Password',
      show_password: 'Show Password',
    },
    title: 'Hotspot Settings',
    pairing: {
      title: 'Update Wi-Fi or Run Diagnostics',
      subtitle:
        'Pairing required before proceeding.\nSome Hotspot models are not supported, check with your manufacturer.',
      scan: 'Pair',
    },
    transfer: {
      title: 'Transfer Hotspot',
      subtitle: 'Send to another Helium Wallet.',
      begin: 'Begin Hotspot Transfer',
    },
    update: {
      title: 'Update Hotspot',
      subtitle: 'Hotspot location or antenna details.',
    },
    visibility_on: {
      title: 'Show Hotspot',
      subtitle: 'Makes the Hotspot visible in the app.',
    },
    visibility_off: {
      title: 'Hide Hotspot',
      subtitle: 'Hides the Hotspot in the app.',
    },
    visibility_popup: {
      title: 'Hide Hotspot',
      message:
        'Hotspot will be hidden from view in the app but stays linked to your account.\n\nTo view Hidden Hotspots and unhide them, go to Settings.',
    },
    discovery: {
      title: 'Discovery Mode',
      subtitle: 'Identify ideal Hotspot placement.',
      no_location_error: {
        title: 'Unable to Start Discovery Mode',
        message:
          'Please set a Hotspot location before initiating Discovery Mode.',
      },
      unasserted_hotspot_warning: {
        title: 'Hotspot Does Not Have A Location',
        message:
          "To visualize Hotspots that respond, we will use your phone's location as a placeholder for the Hotspot.",
      },
    },
    diagnostics: {
      title: 'Diagnostic Report',
      desc_info:
        "Please add more details to the issue you're experiencing below",
      no_hotspots: 'No Hotspots Found',
      scan_again: 'Scan again',
      generating_report: 'Generating Report',
      p2p: 'Peer-to-Peer Connections',
      no_connection: 'No Connection',
      outbound: 'Outbound',
      outbound_help:
        'Hotspot unable to connect to peers on the blockchain. This can be due to router issues, no internet connection, or a firewall blocking incoming connections.',
      inbound: 'Inbound',
      inbound_help:
        'Blockchain peers cannot to reach Hotspot. This can be due to router issues, no internet connection, or a firewall blocking incoming connections.',
      activity: 'Activity',
      blockchain_sync: 'Blockchain Sync',
      block_height: 'Block Height',
      synced: '{{percent}} Synced',
      blockchain_height_help:
        'Hotspot must be 100% synced before it can start mining. This can take several hours or more depending on your internet speed. Keep the Hotspot powered on and connected to the internet.',
      last_challenged: 'Last Challenged',
      last_challenged_help:
        'Neighboring Hotspots have not been able to verify your Hotspot location. In most cases, this is because the antenna is in an area where radio signals can’t reach (buildings blocking, antenna pointed down, antenna indoors).',
      firmware: 'Hotspot Firmware',
      hotspot_type: 'Hotspot Maker',
      app_version: 'App Version',
      wifi_mac: 'Wi-Fi MAC',
      eth_mac: 'Ethernet MAC',
      nat_type: 'NAT Type',
      ip: 'IP Address',
      disk: 'Disk',
      disk_read_only: 'Read-Only',
      disk_no_data: 'No Data Available',
      disk_read_only_instructions:
        'Contact your Manufacturer for a replacement. Hotspot unable to sync due to hardware failure.',
      report_generated: 'Report Generated',
      send_to_support: 'Send Report to Support',
      help_link: 'Read more for possible solutions',
      email_client_missing:
        'Could not find a compatible email client installed',
      other_info: 'Other Information',
      unavailable_warning:
        '* Diagnostics may be unavailable before a Hotspot is fully booted. If data is missing, please go back and generate the diagnostic report again.',
    },
    wifi: {
      title: 'Wi-Fi Network',
      connected_via: 'Connected via',
      not_connected: 'Not Connected',
      available_wifi: 'Available Wi-Fi Networks',
      show_password: 'Show Password',
      hide_password: 'Hide Password',
      ethernet: 'Ethernet',
    },
    options: {
      paired: 'Paired with Hotspot',
      diagnostic: 'Diagnostics',
      wifi: 'Wi-Fi Network',
      reassert: 'Update Location',
      firmware: 'Hotspot Firmware',
    },
    reassert: {
      remaining:
        'You have <b><purple>{{count}} free remaining</purple></b> Hotspot Location Assert Update.',
      remaining_plural:
        'You have <b><purple>{{count}} free remaining</purple></b> Hotspot Location Assert Updates.',
      change_location: 'Change Location',
      confirm: 'I Confirm',
      cost: 'The cost of reasserting location is:',
      insufficient_funds:
        'You do not have the funds available to make\nthis assert. Acquire HNT.',
      confirm_location: "Please confirm your Hotspot's change in location",
      charge: 'You will be charged {{amount}}.',
      pending_message: 'Location update pending.',
      assert_pending: 'Assert Pending...',
      failTitle: 'Failed to reassert hotspot',
      failSubtitle: 'Please try again later',
      current_location: 'Current Location',
      new_location: 'New Location',
      antenna_details: 'Antenna/Height Details',
      update_antenna: 'Update Antenna',
      submit: 'Update Hotspot transaction submitted and now pending.',
      already_pending:
        'Unable to update Hotspot while a transaction is pending. Please try again later.',
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
    education: {
      title: 'Placing\nyour Hotspot.',
      cards: [
        {
          title: 'Give me a nice view',
          subtitle:
            'Hotspots love places where they can see plenty of sky and spaced at least 300 meters away from other Hotspots. ',
        },
        {
          title: "Don't hide me",
          subtitle:
            "Hotspots shouldn't hide in a nightstand or bookcase. Put it next to a window instead.",
        },
        {
          title: 'Buildings may block my signals',
          subtitle:
            "Nearby buildings may decrease your Hotspot's coverage for nearby devices.",
        },
        {
          title: 'Finally - I hate bug screens!',
          subtitle:
            'Try to keep your Hotspot away from metal meshes, which can block radio signals dramatically.',
        },
      ],
      next: "I've read the guide",
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
    location_fee: {
      balance: 'Balance:',
      confirm_location:
        'Confirm the location selected is correct and register your Hotspot.',
      elevation: '{{count}} meter',
      elevation_label: 'Height:',
      elevation_plural: '{{count}} meters',
      fee: 'Fee:',
      fee_next: 'Pay Fee & Register Hotspot',
      gain: '{{gain}} dBi',
      gain_label: 'TX / RX Gain:',
      next: 'Register Hotspot',
      no_funds: 'There is insufficient funds in your account balance',
      subtitle_fee: 'You need to pay a Location Fee to confirm this location.',
      subtitle_free: 'Your Location Fee has been prepaid.',
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
        body: 'Helium needs permission to use Bluetooth. You can enable Bluetooth permission in Settings.',
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
  hotspotAssertAddress: {
    enterHotspot: 'Enter Hotspot Address',
    title: 'Assert Location',
  },
  hotspots: {
    diagnostics: 'Run Diagnostics',
    wifi: 'Update Wifi',
    notOnboarded: 'This hotspot has not been onboarded',
    empty: {
      body: 'Your add hotspot\ninstructions',
      hotspots: {
        add: 'Add Hotspot',
        assertLocation: 'Assert Location',
        transfer: 'Transfer Hotspot',
      },
      title: 'Add a\n[Placeholder] Miner',
    },
    explorer: 'Helium Explorer',
    view_activity: 'After adding a Hotspot, you can view your account on the ',
    title: 'Your Hotspots',
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
        revealWords: 'Reveal Words',
        revealPrivateKey: 'Export Private Key',
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
        'Helium needs access to your location for Bluetooth discovery and to enable location assertion. This information will never be sold or shared.',
      title: 'Location Permission',
    },
  },
  transferHotspot: {
    enterHotspot: 'Enter Hotspot Address',
    enterOwner: 'Enter New Owner Address',
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
