export default {
  generic: {
    cancel: 'Cancel',
    clear: 'Clear',
    back: 'Back',
    connect: 'Connect',
    continue: 'Continue',
    error: 'Error',
    forget: 'Forget',
    goToSettings: 'Go to Settings',
    invalidPassword: 'You password is incorrect',
    next: 'Next',
    ok: 'OK',
    scan_again: 'Scan Again',
    searchLocation: 'Search for an address or place',
    skip: '[skip button]',
    somethingWentWrong: 'Something went wrong',
    understand: 'I understand',
    unknown: 'Unknown',
    period: '.',
    openLinkError: "Don't know how to open this URL: {{url}}",
  },
  welcomeScreen: {
    title: 'Welcome',
    signIn: 'Link Existing Wallet',
    createAccount: 'Create New Wallet',
  },
  hotspotsScreen: {
    title: 'Hotspots',
    addBtn: 'Add Hotspot',
    noItems: 'No Items',
    locationNotSet: 'Location not set',
  },
  hotspotDetailsScreen: {
    noData: "Can't load data",
    setLocationBtn: 'Set Location',
    changeLocationBtn: 'Change Location',
    viewOnHeliumExplorer: 'View on Helium Explorer',
    statusLabel: 'Status: ',
    locationLabel: 'Location: ',
    locationNotSet: 'Not set',
  },
  settingsScreen: {
    title: 'Settings',
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
  },
  hotspotOnboarding: {
    txnConfirmScreen: {
      title: 'Confirm Hotspot Info',
      publicKey: 'Public Key',
      macAddress: 'MAC Address',
      ownerAddress: 'Owner Address',
    },
    askSetLocationScreen: {
      title: 'Set Hotspot Location',
      subtitle1: 'We need to set a location for your Hotspot.',
      subtitle2: 'We can use your phone to do this.',
      p1: 'First, we’ll ask for permission to access your phone’s location.',
      next: 'Ask for Permissions',
      cancel: "No thanks, I'll set it up later",
    },
    skipLocationScreen: {
      title: 'Add Location Later',
      subtitle1: 'You have decided to assert location later.',
      subtitle2: 'Update your location later from settings.',
      next: 'Register Hotspot',
    },
    txnProgressScreen: {
      title: 'Registering Hotspot',
      waitErrorBody:
        'Hotspot miner is waiting to start. Please try again in a few minutes.',
      waitErrorTitle: 'Please Try Again',
      linkCreationError: 'Can not create a transaction link',
    },
    txnSubmitedScreen: {
      title: 'Registering Hotspot',
      subtitle:
        'This can take a few minutes so feel free to close this screen.',
      next: 'Go to Hotspots List',
    },
    pickLocationScreen: {
      title: 'Hotspot Location',
      next: 'Set Location',
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
  pinManagement: {
    confirmPin: {
      subtitle: 'Re-enter your PIN',
      title: 'Repeat PIN',
    },
    createPin: {
      subtitle: 'Let’s secure your account with a PIN Code.',
      title: 'Set PIN Code',
    },
  },
  lockScreen: {
    enterCurrent: 'Enter your current PIN to continue',
    title: 'Enter Your PIN',
  },
  mapComponent: {
    noLocationBody: 'Pair with the Hotspot to begin.',
    noLocationTitle: 'No Asserted Location',
  },
  checkLocationPermission: {
    error: {
      title: 'Location Permission Not Granted',
      message: 'The app needs access to your location to proceed',
    },
  },

  hotspot_setup: {
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
      no_funds: 'There is insufficient HNT in your account balance',
      subtitle_fee:
        'You need to pay a $10 Location Fee (in DC) to confirm this location.',
      subtitle_free: 'Your Location Fee ($10) has been prepaid.',
      title: 'Location Fee',
    },
  },
}
