export default {
  account_import: {
    alert: {
      body: "This seed phrase doesn't correspond to a Helium account",
      title: 'Error',
    },
    complete: {
      subtitle: 'This will just take a moment.',
      title: 'Recovering Account...',
    },
    confirm: {
      next: 'Submit Seed Phrase',
      subtitle:
        'Here are the 12 words you’ve entered. Tap on any of them if you need to edit.',
      title: 'Please Confirm\nSeed Phrase',
    },
    word_entry: {
      directions: 'Enter the <b>{{ordinal}}</b> Word',
      placeholder: '{{ordinal}} word',
      subtitle: 'Recovery Seed Phrases are not\ncase-sensitive',
      title: 'Enter Recovery\nSeed Phrase',
    },
  },
  account_setup: {
    confirm: {
      failed: {
        subtitle_1: "You've reentered the seed phrase incorrectly.",
        subtitle_2: 'Please try again.',
        title: 'Sorry...',
        try_again: 'Try Again',
      },
      forgot: 'I forgot my words',
      subtitle:
        'Which word below was your <b><purple>{{ordinal}} word?</purple></b>',
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
    enable_notifications: {
      later: "No thanks, I'll set it up later",
      mining: 'Hotspot is Mining',
      subtitle:
        'Be alerted when important updates happen to your account or to your Hotspots.',
      title: 'Enable Notifications',
    },
    generating: 'GENERATING YOUR 12 WORDS...',
    passphrase: {
      next: 'I have written these down',
      subtitle:
        'It is crucial you <b>write all of these\n12 words down, in order</b>.\n\n<red>Helium cannot recover these words.</red>',
      title: 'Your 12 Word\nPassword',
      warning: 'Helium cannot recover these words',
    },
    warning: {
      generate: 'Generate my 12 words',
      subtitle:
        'Helium accounts are protected by\n<b><purple>12 unique words</purple></b>, that act as\na password for signing in or\nrecovering accounts.',
      title: 'Creating\nSecure Account.',
    },
    welcome: {
      create_account: 'Create an Account',
      import_account: 'Import Existing Account',
      subtitle:
        'Host a Hotspot and earn <b><purple>$HNT</purple></b>,\na new cryptocurrency,\nfor building The People’s Network.',
      title: 'Welcome\nto Helium',
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
      elevation: 'Height (meters)',
      gain: 'TX / RX Gain',
      select: 'Select Antenna',
      subtitle: 'Submit antenna and height details for your Hotspot.',
      title: 'Antenna Setup',
    },
  },
  auth: {
    enter_current: 'Enter your current PIN to continue',
    error: 'Incorrect PIN',
    title: 'Enter Your PIN',
  },
  back: 'Back',
  generic: {
    active: 'Active',
    address: 'Address',
    balance: 'Your Balance',
    blocks: 'Blocks',
    cancel: 'Cancel',
    challenger: 'Challenger',
    clear: 'Clear',
    connect: 'Connect',
    continue: 'Continue',
    copy: 'Copy',
    copy_address: 'Copy Address',
    done: 'Done',
    error: 'Error',
    fee: 'Fee',
    forget: 'Forget',
    from: 'From',
    go_back: 'Go Back',
    go_to_account: 'Go to My Account',
    go_to_settings: 'Go to Settings',
    hnt_to_currency: '{{currencyType}}. Data from CoinGecko',
    hotspot: 'Hotspot',
    invalid_password: 'You password is incorrect',
    kilometers: '{{distance}}km',
    learn_more: 'Learn More',
    loading: 'Loading...',
    location: 'Location',
    location_blocked:
      "Location is turned off. Go to your phone's settings to allow Location Services.",
    meters: '{{distance}}m',
    minutes: '{{count}} minute',
    minutes_plural: '{{count}} minutes',
    need_help: 'I Need Help',
    new: 'New',
    next: 'Next',
    offline: 'Offline',
    ok: 'OK',
    online: 'Online',
    owner: 'Owner',
    readMore: 'Read More',
    save: 'Save',
    scan_again: 'Scan Again',
    search_location: 'Search for an address or place',
    seconds: '{{count}} second',
    seconds_plural: '{{count}} seconds',
    share: 'Share',
    skip: 'Skip',
    skip_for_now: 'Skip for now',
    something_went_wrong: 'Something went wrong',
    submit: 'Submit',
    to: 'To',
    unable_to_get_location: 'We were unable to get your location',
    unavailable: 'Unavailable',
    understand: 'I understand',
    unknown: 'Unknown',
    validator: 'Validator',
    witness: 'Witness',
  },
  hotspot_details: {
    challenge_sub_title: '(witness, challenger, or challengee)',
    challenge_title: 'Challenges',
    checklist: 'Progress',
    data_only_prompt: {
      message:
        'These Hotspots earn HNT for transmitting data packets from sensors.\n\nThey do not affect transmit scales and do not affect Hotspot Proof-of-Coverage earnings of nearby Hotspots.',
      title: 'Data-Only Hotspot Explained',
    },
    distance_away: '{{distance}} away',
    get_witnessed: 'GET WITNESSED',
    get_witnessed_desc:
      'Position your Hotspot so that it can be heard by others. Often this means moving it higher in order to increase its range.',
    no_location: 'No Location',
    no_location_body: 'Pair with the Hotspot to begin.',
    no_location_title: 'No Asserted Location',
    num_witnesses: '{{count}} Witness',
    num_witnesses_plural: '{{count}} Witnesses',
    options: {
      settings: 'Settings',
      share: 'Share',
      viewExplorer: 'View on Explorer',
    },
    overview: 'Earnings',
    owner: 'Owned by {{address}}',
    owner_you: 'Owned by you',
    pass_rate: 'PASS RATE',
    percent_synced: '{{percent}}% Synced',
    picker_options: ['24H', '14D', '30D'],
    picker_prompt: 'Select Range',
    picker_title: 'Past',
    relay_prompt: {
      message:
        "Hotspot's connection is being relayed through another Hotspot on the network which may affect mining. To take a Hotspot out of Relay, please visit the troubleshooting guide.",
      title: 'Hotspot is Relayed',
    },
    relayed: 'Relayed',
    reward_scale_prompt: {
      message:
        "When this Hotspot transmits a beacon, any Hotspots that hear it will have its mining rewards scaled by this number. This Hotspot's Challengee reward will also scale by this number.",
      title: 'Transmit Scale',
    },
    reward_title: 'HNT Rewards',
    starting_sync: 'Starting Sync...',
    status_data_only: 'Data-Only',
    status_offline: 'Needs Attention',
    status_online: 'Online',
    status_prompt_offline: {
      title: 'Hotspot is offline and not syncing.',
    },
    status_prompt_online: {
      subtitle_active: 'Status: Block {{hotspotBlock}} of {{currentBlock}}',
      subtitle_starting: 'Beginning to sync...',
      title: 'Hotspot is online and syncing.',
    },
    status_syncing: 'Syncing',
    title: 'Hotspot Details',
    witness_desc:
      'These Hotspots witnessed {{hotspotAnimal}}’s\nbeacons over the last 5 days.',
    witness_desc_none:
      'No Hotspots have heard and responded to\n{{hotspotAnimal}}’s beacons over the last 5 days.',
    witness_prompt: {
      message:
        'The Hotspots in this list have witnessed a Beacon from {{hotspotName}} recently.\n\nFluctuations are normal and expected. The number of Hotspots will reset to zero if you update location, antenna, or elevation',
      title: 'Witnesses',
    },
    witness_title: 'Average Witnesses',
  },
  hotspot_settings: {
    diagnostics: {
      activity: 'Activity',
      app_version: 'App Version',
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
      add_hotspot_error_body:
        'There was an error constructing the Add Hotspot transaction. Please try again.',
      already_added:
        'You already added this hotspot to your wallet. Continue to the next screen to assert its location.',
      assert_loc_error_body:
        'There was an error constructing the Assert Location transaction. Please try again.',
      assert_loc_error_no_change_body:
        'The Hotspot location has not changed. Drag the pin to a different location and try again.',
      assert_loc_error_no_change_title: 'Location Unchanged',
      assert_loc_error_no_loc:
        'The selected location is invalid. Please try again.',
      back: 'Back to Hotspot Pairing',
      checking_status: 'Checking Hotspot status...',
      error:
        'Cannot proceed with Add Hotspot. If you purchased the Hotspot from Helium, please contact support@helium.com and include mac address {{mac}}',
      help_link: 'What are Data Credits?',
      label: 'CURRENT ADD HOTSPOT FEE (PAID IN DATA CREDITS)',
      no_onboarding_key_message:
        'Unable to add Hotspot. Please contact your Hotspot manufacturer for next steps.',
      no_onboarding_key_title: 'Hotspot not found on Onboarding Server',
      not_owned:
        'You do not own this hotspot and cannot add it to your wallet.',
      subtitle:
        'Adding Hotspots requires a small fee (paid in Data Credits) to verify its authenticity.',
      support_answer:
        'Data Credits are required to send data over the Helium Network.',
      support_title: 'What are Data Credits?',
      title: 'Add Hotspot',
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
      connecting: 'Connecting to {{hotspotName}}',
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
    disconnect_dialog: {
      body: 'The Hotspot will no longer automatically connect to {{wifiName}}.',
      title: 'Forget Network?',
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
      settings_p_1:
        "In order to update your Hotspot's location, we'll need additional location permissions.",
      settings_p_2:
        "Tap the button below to be taken to Settings. Under 'Location' tap 'While using the App'.",
      subtitle:
        'We need to set a location for your Hotspot. We can use your phone to do this.',
      title: 'Set Hotspot\nLocation',
    },
    error: {
      alertMessage:
        'Request to servers have timed out and we cannot add your Hotspot at this time.\n\nPlease contact support@helium.com and note MAC address %{mac}.',
      alertTitle: 'Servers Unable to Respond',
    },
    ethernet: {
      next: 'My Hotspot is Connected',
      secure: 'Please connect your ethernet cable securely',
      subtitle:
        'Plug your Hotspot into an available and active port on your internet router.',
      title: "Let's use Ethernet",
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
      calculating_text: 'Calculating HNT Amount',
      confirm_location:
        'Confirm the location selected is correct and register your Hotspot.',
      elevation: '{{count}} meter',
      elevation_label: 'Height:',
      elevation_plural: '{{count}} meters',
      error_body: 'There was an error loading fee data. Please try again.',
      error_title: 'Error',
      fee: 'Fee:',
      fee_next: 'Pay Fee & Register Hotspot',
      gain: '{{gain}} dBi',
      gain_label: 'TX / RX Gain:',
      next: 'Register Hotspot',
      no_funds: 'There is insufficient HNT in your account balance',
      pending_p_1:
        'Your Hotspot has a Confirm Location transaction pending in the blockchain.',
      pending_p_2:
        "If you'd like to change the Hotspot's location, wait for the previous transaction to complete before updating its location.",
      subtitle_fee:
        'You need to pay a $10 Location Fee (in DC) to confirm this location.',
      subtitle_free: 'Your Location Fee ($10) has been prepaid.',
      title: 'Location Fee',
    },
    not_owner: {
      contact_manufacturer:
        'If you think you are the Hotspot Owner (i.e. you bought it) contact the Hotspot manufacturer.',
      subtitle_1: 'Perhaps you’re hosting it for\nsomeone else?',
      subtitle_1_no_follow:
        "If you're a Host updating Wi-Fi, you may exit setup now.",
      subtitle_2:
        'Following a Hotspot allows you to monitor a Hotspot within the app when you don’t own it.',
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
        body:
          'To start pairing, turn on Bluetooth. Keep Bluetooth on until you finish registration.',
        title: 'Enable Bluetooth',
      },
      alert_no_permissions: {
        body:
          'Helium needs permission to use Bluetooth. You can enable Bluetooth permission in Settings.',
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
      subtitle:
        'Select your Hotspot Maker below to add a Hotspot to the Helium Network.',
      title: 'Add\nyour Hotspot.',
    },
    skip_location: {
      subtitle_1: 'You have decided to assert location later.',
      subtitle_2: 'Update your location later from settings.',
      title: 'Add Hotspot',
    },
    wifi_password: {
      connecting: 'Connecting to Network',
      error_title: 'Invalid Password',
      forget: 'Forget',
      forget_alert_message:
        'This Hotspot will no longer automatically connect to ',
      forget_alert_title: 'Forget Network?',
      forget_network: 'Forget Network',
      hide_password: 'Hide Password',
      join_title: 'Enter Password',
      message:
        'The Hotspot is currently connected to this network. Changing the password can cause the Hotspot to go offline.',
      placeholder: 'Password',
      show_password: 'Show Password',
      subtitle:
        'Enter your Wi-Fi’s credentials to connect your Hotspot to this Network.',
      update_title: 'Update Wi-Fi',
    },
    wifi_scan: {
      available_networks: 'Available Networks',
      connected:
        'Your Hotspot is <green>Online</green> and connected to %{network}.',
      connection_failed: 'Connection failed, please try again',
      disconnect: 'Forget Network',
      disconnect_failed: 'Disconnect failed, please try again',
      disconnect_help:
        'To update the password or connect to a new network, first forget the old network.',
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
      tip: 'Did you check if your <blue>Wi-fi is set to hidden</blue>?',
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    empty: {
      body: 'Start below to add your Hotspot\nto the Helium Network.',
      failed:
        'We’re having problems fetching your Hotspots due to an API or network outage. Please try again later.',
      hotspots: {
        add: 'Add Hotspot',
        body:
          'Hardware miners that participate in Proof-of-Coverage and mine HNT.',
        title: 'Hotspots',
      },
      info: 'Info',
      search: 'Search',
      title: 'Add a\nHelium Miner',
      validators: {
        body:
          'Validator nodes secure the Helium network by verifying transactions and adding blocks in Consensus Groups.',
        title: 'Validators',
      },
    },
    list: {
      no_offline: 'NO OFFLINE HOTSPOTS',
      no_results: 'No Results',
      online: 'ONLINE HOTSPOTS',
    },
    new: {
      explorer: 'Browse Network Map',
      setup: '+ Add a Hotspot',
      subtitle:
        'If you just added a Hotspot, hang tight. It takes a few moments for the Network to propagate the Hotspot.',
      title: 'Add a New Hotspot',
    },
    owned: {
      filter: {
        earn: 'Top Earning Hotspots',
        followed: 'Followed Hotspots',
        near: 'Nearest Hotspots',
        new: 'Newest Hotspots',
        offline: 'Offline Hotspots',
        unasserted: 'Unasserted Hotspots',
      },
      hotspot: 'Hotspot',
      hotspot_plural: '{{count}} Hotspots',
      reward_hotspot_and_validator_summary:
        'Your {{hotspot}} and \n{{validator}} have earned\n{{hntAmount}} in the past 24 hours.',
      reward_hotspot_summary:
        'Your Hotspot has earned\n{{hntAmount}} in the past 24 hours.',
      reward_hotspot_summary_plural:
        'Your {{count}} Hotspots have earned\n{{hntAmount}} in the past 24 hours.',
      reward_validator_summary:
        'Your Validator has earned\n{{hntAmount}} in the past 24 hours.',
      reward_validator_summary_plural:
        'Your {{count}} Validators have earned\n{{hntAmount}} in the past 24 hours.',
      title: 'My Hotspots',
      title_no_hotspots: 'Hotspots',
      validator: 'Validator',
      validator_plural: '{{count}} Validators',
      your_hotspots: 'Your Hotspots',
    },
    search: {
      all_hotspots: 'All Hotspots',
      my_hotspots: 'My Hotspots',
      network: 'Network\nSearch',
      placeholder: 'Search...',
      recent_searches: 'Recent Searches',
      tips: 'Search Tips',
      tips_body:
        'Try typing a Hotspot or Validator Name (e.g. silly-animal-name) or a place name (e.g. New York City).\n\nNote: Hotspots and Validators added within the last 10 minutes may not appear.',
      title: 'Hotspot Search',
    },
    sort_by: 'Sort Hotspots By',
    ticker:
      '{{formattedHotspotCount}} Hotspots • Oracle Price: {{oraclePrice}} • Block Time: {{formattedBlockTime}} secs • ',
    ticker_no_block:
      '{{formattedHotspotCount}} Hotspots • Oracle Price: {{oraclePrice}} • ',
  },
  learn: {
    next: "I've read the guide",
    slides: [
      {
        bottomBody:
          'Beacons are special packets, transmitted by Hotspots, that can be heard by any other neighbouring Hotspots.\n\nThese signals allow the Network to determine which Hotspots are within receiving range of each other. These neighbours are called ‘witnesses’ and Hotspots that hear your beacon are added to your Witness List.',
        bottomTitle: 'How do Beacons work?',
        topBody: 'Your Hotspot will listen for beacons from nearby Hotspots',
        topTitle: 'Listen for Beacons',
      },
      {
        bottomBody:
          'Beacons are special packets, transmitted by Hotspots, that can be heard by any other neighbouring Hotspots.\n\nThese signals allow the Network to determine which Hotspots are within receiving range of each other. These neighbours are called ‘witnesses’ and Hotspots that hear your beacon are added to your Witness List.',
        bottomTitle: 'How do Beacons work?',
        topBody: 'Your Hotspot will listen for beacons from nearby Hotspots',
        topTitle: 'Listen for Beacons',
      },
      {
        bottomBody:
          'Beacons are special packets, transmitted by Hotspots, that can be heard by any other neighbouring Hotspots.\n\nThese signals allow the Network to determine which Hotspots are within receiving range of each other. These neighbours are called ‘witnesses’ and Hotspots that hear your beacon are added to your Witness List.',
        bottomTitle: 'How do Beacons work?',
        topBody: 'Your Hotspot will listen for beacons from nearby Hotspots',
        topTitle: 'Listen for Beacons',
      },
    ],
    title: 'How do I earn\nHNT?',
  },
  more: {
    sections: {
      app: {
        convertHntToCurrency: 'Convert HNT to Currency',
        enableFleetMode: 'Enable Fleet Mode',
        enableHapticFeedback: 'Enable Haptic Feedback',
        language: 'Language',
        showHiddenHotspots: 'Show Hidden Hotspots',
        signOut: 'Sign Out',
        signOutAlert: {
          body:
            'You are signing out of your account. Do you have your 12 recovery words? If you don’t, you will lose access to:\n\n- your Hotspots\n- your HNT\n- your Wallet',
          title: 'Warning!',
        },
        title: 'App',
      },
      learn: {
        coverage: 'Network Coverage',
        heliumtoken: 'Helium Token',
        hotspotPlacement: 'Hotspot Placement',
        joinDiscord: 'Join Helium Discord',
        support: 'Support',
        title: 'Learn',
        tokenEarnings: 'Token Earnings',
        troubleshooting: 'Troubleshooting',
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
        requirePinForPayments: 'Require PIN for Payments',
        resetPin: 'Reset PIN',
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
  wallet: {
    chartRanges: {
      daily: {
        accessibilityLabel: '14 Days',
        label: '14D',
      },
      monthly: {
        accessibilityLabel: '12 Months',
        label: '12M',
      },
      weekly: {
        accessibilityLabel: '12 Weeks',
        label: '12W',
      },
    },
    copiedToClipboard: 'Copied {{address}} to clipboard',
    empty: {
      description:
        'You can send HNT to the below address/QR or deploy a Hotspot to start earning.',
      subtitle: 'Your balance is zero.',
      title: 'Welcome to\nyour wallet',
    },
    intro_body:
      'This Account tab acts as a virtual wallet for any HNT or Data Credits you hold.',
    intro_slides: [
      {
        body: 'Access your address or QR code.',
        title: 'Receive HNT',
      },
      {
        body: 'Scan a QR code or enter details manually.',
        title: 'Send HNT',
      },
      {
        body: 'Green signifies HNT being <green>added</green> to your account.',
        title: 'Chart your account',
      },
      {
        body: 'Blue signifies HNT <blue>leaving</blue> your account.',
        title: 'Chart your account',
      },
    ],
    share: 'Share',
    title: 'My Wallet',
  },
}
