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
    revealPrivateKey: {
      alertMessage:
        "This will access and display your private key from your device's secure storage",
      alertTitle: 'Are you sure?',
      done: 'Done',
      download: 'Download Wallet App',
      export: 'Export to Wallet App',
      inputPlaceholder: 'Enter Password',
      passMessage:
        'Enter a password to secure your private key. You will need to enter this again in Wallet App.',
      privateKey: 'private key',
      subtitle:
        '<secondaryText>Do not share your private key!</secondaryText><red>\n\nIf someone has your private key they will have full control of your wallet!</red>',
      tap: 'Tap to reveal your private key',
      tapCopy: 'Tap to copy. Your private key is:',
      title: 'Your Private Key',
    },
    warning: {
      generate: 'Generate my 12 words',
      subtitle:
        'Accounts are protected by\n<b><errorText>12 unique words</errorText></b>, that act as\na password for signing in or\nrecovering accounts.',
      title: 'Creating\nSecure Account.',
    },
    welcome: {
      create_account: 'Create an account',
      import_account: 'Link Helium Wallet',
      login_with_helium:
        'Already have the Helium Wallet App?\nTap to get started.',
      run_diagnostics: 'Skip and run Diagnostics',
      subtitle:
        'Host a Hotspot and earn <b><purple>$HNT</purple></b>, a new cryptocurrency, for building The People’s Network.',
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
    copied: 'Copied {{target}}',
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
    diagnostics: {
      activity: 'Activity',
      app_version: 'App Version',
      block_height: 'Block Height',
      blockchain_height_help:
        'Hotspot must be 100% synced before it can start mining. This can take several hours or more depending on your internet speed. Keep the Hotspot powered on and connected to the internet.',
      blockchain_sync: 'Blockchain Sync',
      desc_info:
        "Please add more details to the issue you're experiencing below",
      disk: 'Disk',
      disk_no_data: 'No Data Available',
      disk_read_only: 'Read-Only',
      disk_read_only_instructions:
        'Contact your Manufacturer for a replacement. Hotspot unable to sync due to hardware failure.',
      email_client_missing:
        'Could not find a compatible email client installed',
      eth_mac: 'Ethernet MAC',
      firmware: 'Hotspot Firmware',
      generating_report: 'Generating Report',
      help_link: 'Read more for possible solutions',
      hotspot_type: 'Hotspot Maker',
      inbound: 'Inbound',
      inbound_help:
        'Blockchain peers cannot to reach Hotspot. This can be due to router issues, no internet connection, or a firewall blocking incoming connections.',
      ip: 'IP Address',
      last_challenged: 'Last Challenged',
      last_challenged_help:
        'Neighboring Hotspots have not been able to verify your Hotspot location. In most cases, this is because the antenna is in an area where radio signals can’t reach (buildings blocking, antenna pointed down, antenna indoors).',
      nat_type: 'NAT Type',
      no_connection: 'No Connection',
      no_hotspots: 'No Hotspots Found',
      other_info: 'Other Information',
      outbound: 'Outbound',
      outbound_help:
        'Hotspot unable to connect to peers on the blockchain. This can be due to router issues, no internet connection, or a firewall blocking incoming connections.',
      p2p: 'Peer-to-Peer Connections',
      report_generated: 'Report Generated',
      scan_again: 'Scan again',
      send_to_support: 'Send Report to Support',
      synced: '{{percent}} Synced',
      title: 'Diagnostic Report',
      unavailable_warning:
        '* Diagnostics may be unavailable before a Hotspot is fully booted. If data is missing, please go back and generate the diagnostic report again.',
      wifi_mac: 'Wi-Fi MAC',
    },
    discovery: {
      no_location_error: {
        message:
          'Please set a Hotspot location before initiating Discovery Mode.',
        title: 'Unable to Start Discovery Mode',
      },
      subtitle: 'Identify ideal Hotspot placement.',
      title: 'Discovery Mode',
      unasserted_hotspot_warning: {
        message:
          "To visualize Hotspots that respond, we will use your phone's location as a placeholder for the Hotspot.",
        title: 'Hotspot Does Not Have A Location',
      },
    },
    options: {
      diagnostic: 'Diagnostics',
      firmware: 'Hotspot Firmware',
      paired: 'Paired with Hotspot',
      reassert: 'Update Location',
      wifi: 'Wi-Fi Network',
    },
    pairing: {
      scan: 'Pair',
      subtitle:
        'Pairing required before proceeding.\nSome Hotspot models are not supported, check with your manufacturer.',
      title: 'Update Wi-Fi or Run Diagnostics',
    },
    reassert: {
      already_pending:
        'Unable to update Hotspot while a transaction is pending. Please try again later.',
      antenna_details: 'Antenna/Height Details',
      assert_pending: 'Assert Pending...',
      change_location: 'Change Location',
      charge: 'You will be charged {{amount}}.',
      confirm: 'I Confirm',
      confirm_location: "Please confirm your Hotspot's change in location",
      cost: 'The cost of reasserting location is:',
      current_location: 'Current Location',
      failSubtitle: 'Please try again later',
      failTitle: 'Failed to reassert hotspot',
      insufficient_funds:
        'You do not have the funds available to make\nthis assert. Acquire HNT.',
      new_location: 'New Location',
      pending_message: 'Location update pending.',
      remaining:
        'You have <b><purple>{{count}} free remaining</purple></b> Hotspot Location Assert Update.',
      remaining_plural:
        'You have <b><purple>{{count}} free remaining</purple></b> Hotspot Location Assert Updates.',
      submit: 'Update Hotspot transaction submitted and now pending.',
      update_antenna: 'Update Antenna',
    },
    title: 'Hotspot Settings',
    transfer: {
      begin: 'Begin Hotspot Transfer',
      subtitle: 'Send to another Helium Wallet.',
      title: 'Transfer Hotspot',
    },
    update: {
      subtitle: 'Hotspot location or antenna details.',
      title: 'Update Hotspot',
    },
    visibility_off: {
      subtitle: 'Hides the Hotspot in the app.',
      title: 'Hide Hotspot',
    },
    visibility_on: {
      subtitle: 'Makes the Hotspot visible in the app.',
      title: 'Show Hotspot',
    },
    visibility_popup: {
      message:
        'Hotspot will be hidden from view in the app but stays linked to your account.\n\nTo view Hidden Hotspots and unhide them, go to Settings.',
      title: 'Hide Hotspot',
    },
    wifi: {
      available_wifi: 'Available Wi-Fi Networks',
      connected_via: 'Connected via',
      ethernet: 'Ethernet',
      hide_password: 'Hide Password',
      not_connected: 'Not Connected',
      show_password: 'Show Password',
      title: 'Wi-Fi Network',
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
      cards: [
        {
          subtitle:
            'Hotspots love places where they can see plenty of sky and spaced at least 300 meters away from other Hotspots. ',
          title: 'Give me a nice view',
        },
        {
          subtitle:
            "Hotspots shouldn't hide in a nightstand or bookcase. Put it next to a window instead.",
          title: "Don't hide me",
        },
        {
          subtitle:
            "Nearby buildings may decrease your Hotspot's coverage for nearby devices.",
          title: 'Buildings may block my signals',
        },
        {
          subtitle:
            'Try to keep your Hotspot away from metal meshes, which can block radio signals dramatically.',
          title: 'Finally - I hate bug screens!',
        },
      ],
      next: "I've read the guide",
      title: 'Placing\nyour Hotspot.',
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
      fee_next: 'Pay Fee & Submit',
      gain: '{{gain}} dBi',
      gain_label: 'TX / RX Gain:',
      next: 'Submit',
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
      body_connect_failed:
        'Hotspot Miner is unable to respond to requests. Please reboot the Hotspot and try again later.',
      disconnected:
        'There was an error connecting to the Hotspot. Please try again.',
      next: 'Exit Setup',
      subtitle: {
        invalid_onboarding_address:
          'Your onboarding address is invalid. Please contact the Hotspot manufacturer for next steps.',
        no_onboarding_key:
          'Unable to find Hotspot in the Onboarding Server. Please contact the Hotspot manufacturer for next steps.',
        service_unavailable:
          "The Onboarding Server is temporarily unavailable and users won't be able to add Hotspots at this time.  Check for updates on status.helium.com and try again later.",
        something_went_wrong:
          'Something went wrong. Please contact the Hotspot manufacturer for next steps.',
      },
      title: 'Onboarding Error',
      title_connect_failed: 'Hotspot Pairing Failed',
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
      view_pending_add: 'View Pending Add Gateway',
      view_pending_assert: 'View Pending Assert Location',
      view_pending_transfer: 'View Pending Transfer',
    },
    selection: {
      subtitle: 'Choose Your Maker',
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
    assertLocation: 'Assert Location',
    copiedToClipboard: 'Copied {{address}} to clipboard',
    copyAddress: 'Copy Address',
    diagnostics: 'Run Diagnostics',
    empty: {
      hotspots: {
        add: 'Add Hotspot',
        assertLocation: 'Assert Location',
        transfer: 'Transfer Hotspot',
      },
      title: 'Add a Miner',
    },
    noLocation: 'No Location',
    notOnboarded: 'This hotspot has not been onboarded',
    onboardHotspot: 'Onboard Hotspot',
    onboardIot: 'Onboard Iot Network',
    onboardMobile: 'Onboard Mobile Network',
    title: 'Your Hotspots',
    transfer: 'Transfer Hotspot',
    wifi: 'Update Wifi',
  },
  migrate: {
    action: 'Download the Helium Wallet App',
    helium: {
      subtitle1: 'Your tokens are safe.',
      subtitle2:
        'The Hotspot app is now <b>a Helium and FreedomFi Hotspot maintenance only app.</b>',
      subtitle3:
        '<b>Export your wallet private key to the Helium Wallet app in "Settings".</b> You can continue to view and manage your tokens and rewards in the Helium Wallet app.',
      title: 'The Helium Hotspot app is changing.',
    },
    skip: 'Skip for now',
  },
  more: {
    sections: {
      account: {
        copyHeliumAddress: 'Copy Helium Address - {{heliumAddress}}',
        copySolanaAddress: 'Copy Solana Address - {{solanaAddress}}',
        title: 'Account',
      },
      app: {
        language: 'Language',
        signOut: 'Sign Out',
        signOutAlert: {
          body: 'You are signing out of your account.',
          bodyWithWords:
            'You are signing out of your account. Do you have your recovery words? If you don’t, you will lose access to:\n\n- your Hotspots\n- your HNT\n- your Wallet',
          title: 'Warning!',
        },
        signOutWithLink: 'Sign Out - Linked as: {{address}}',
        title: 'App',
      },
      developer: {
        cluster: 'Solana Cluster',
        enable: 'Enable Developer Options',
        forceSolana: 'Force Solana Blockchain',
        title: 'Developer',
        transitionStatus: 'Sentinel Status - {{status}}',
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
        revealPrivateKey: 'Export Private Key to Wallet App',
        revealWords: 'Reveal Words',
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
        'Helium needs access to your location for Bluetooth discovery and to enable location assertion. This information will never be sold or shared.',
      title: 'Location Permission',
    },
  },
  transferHotspot: {
    enterHotspot: 'Enter Hotspot Address',
    enterOwner: 'Enter New Owner Address',
    submit: 'Submit',
    submitComplete: 'Transfer Successfully Submitted!\n Pending Txn Hash:',
    title: 'Transfer Hotspot',
  },
  wallet: {
    checkLink: {
      link: 'Link to Helium Wallet App',
      message:
        "You're currently linked to the Helium Hotspot app. You must download the Helium Wallet App and update your link",
      title: 'Update required',
    },
    copiedToClipboard: 'Copied {{address}} to clipboard',
  },
}
