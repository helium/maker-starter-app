export default {
  account_import: {
    alert: {
      body: '该助记词不匹配任何 Helium 帐户',
      title: '出错',
    },
    complete: {
      title: '正在恢复帐户...',
    },
    confirm: {
      next: '提交助记词',
      subtitle: '您输入了以下 12 个助记词。如需编辑，请点击任一个。',
      title: '请确认助记词\n',
    },
    word_entry: {
      placeholder: '第 {{ordinal}} 个助记词',
      subtitle: '恢复助记词不区分大小写\n',
      title: '输入恢复\n助记词',
    },
  },
  account_setup: {
    confirm: {
      forgot: '我忘记了助记词',
      title: '确认助记词\n',
    },
    confirm_pin: {
      subtitle: '重复输入 PIN',
      title: '重复 PIN',
    },
    create_pin: {
      subtitle: '我们使用 PIN 码安全保护您的帐户。',
      title: '设置 Pin 码',
    },
    generating: '正在生成您的 12 个助记词...',
    passphrase: {
      next: '我已记下了',
      title: '您的 12 个助记词密码\n',
    },
    warning: {
      generate: '生成我的 12 个助记词',
      title: '正在创建安全帐户。\n',
    },
    welcome: {
      create_account: '新建帐户',
      import_account: '导入现有帐户',
      title: '欢迎使用 Helium\n',
    },
  },
  antennas: {
    elevation_info: {
      desc: '估算天线位置的离地高度。平房屋顶天线的离地高度约为 5 米。',
      title: 'Hotspot 高度',
    },
    gain_info: {
      desc:
        '此值介于 1 - 15 之间，精确到小数点后一位。由 Hotspot 或天线制造商提供。',
      title: '天线 TX/RX 增益',
    },
    onboarding: {
      dbi: 'dBi',
      elevation: '高度（米）',
      gain: 'TX/RX 增益',
      select: '选择天线',
      subtitle: '提交 Hotspot 的天线和高度详细信息。',
      title: '天线设置',
    },
  },
  auth: {
    enter_current: '输入您当前的 PIN 码以继续',
    title: '输入 PIN 码',
  },
  back: '返回',
  generic: {
    cancel: '取消',
    clear: '清除',
    connect: '连接',
    continue: '继续',
    error: '出错',
    forget: '忘记',
    go_to_settings: '前往“设置”',
    invalid_password: '您的密码不正确',
    next: '下一个',
    ok: '确定',
    scan_again: '重新扫描',
    search_location: '搜索地址或位置',
    skip_for_now: '暂时跳过',
    something_went_wrong: '出现错误',
    understand: '我知道了',
    unknown: '未知',
  },
  hotspot_details: {
    no_location_body: 'Hotspot 配对开始。',
    no_location_title: '没有声明位置',
  },
  hotspot_settings: {
    wifi: {
      hide_password: '隐藏密码',
      show_password: '显示密码',
    },
  },
  hotspot_setup: {
    add_hotspot: {
      wait_error_body: 'Hotspot Miner 即将启动。请稍后重试。',
      wait_error_title: '请重试',
    },
    ble_error: {
      enablePairing: '启用配对模式',
      pairingInstructions: '请参考制造商说明以启用蓝牙',
      title: '找不到 Hotspot',
    },
    ble_scan: {
      cancel: '取消扫描',
      title: '扫描 Hotspot',
    },
    ble_select: {
      hotspots_found: '已找到 {{count}} 个 Hotspot。',
      hotspots_found_plural: '已找到 {{count}} 个 Hotspot',
      subtitle: '选择您的 Hotspot 以继续。',
    },
    confirm: {},
    diagnostics: {
      title: '诊断',
    },
    education: {
      cards: [
        {
          subtitle:
            'Hotspot 最适合视野开阔、可看到天空、距离其他 Hotspot 至少 300 米以外的位置。 ',
          title: '让我好好看风景',
        },
        {
          subtitle: '不要将 Hotspot 放在床头柜或书柜里。请将其放在靠窗的位置。',
          title: '别把我藏在暗处',
        },
        {
          subtitle: '周边建筑物可能削弱 Hotspot 对邻近设备的覆盖。',
          title: '建筑物可能阻碍我的信号传播',
        },
        {
          subtitle:
            '尽可能让 Hotspot 远离金属网，因为金属网会极大地阻挡无线电信号。',
          title: '还有，我最讨厌防虫网了!',
        },
      ],
      title: '放置\n您的 Hotspot。',
    },
    enable_location: {
      cancel: '不，谢谢，稍后设置',
      next: '请求权限',
      p_1: '首先，我们需要您手机的位置权限。',
      subtitle:
        '我们需要为您的 Hotspot 设定位置。可以通过您的手机完成这一操作。',
      title: '设定 Hotspot\n位置',
    },
    external: {},
    firmware_update: {
      current_version: '当前版本',
      explanation:
        '您的 Hotspot 将自动检查更新。这可能需要 10 分钟。保持插入，稍后检查。',
      next: '明白了',
      required_version: '所需版本',
      subtitle: '您的 Hotspot 需要更新固件才能继续使用。',
      title: '有可用更新',
    },
    location: {
      next: '设定位置',
      title: 'Hotspot 位置',
    },
    location_fee: {
      balance: '余额:',
      confirm_location: '确认所选位置正确无误，然后注册您的 Hotspot.。',
      elevation: '{{count}} 米',
      elevation_label: '高度:',
      elevation_plural: '{{count}} 米',
      fee: '费用:',
      fee_next: '支付费用并注册 Hotspot',
      gain: '{{gain}} dBi',
      gain_label: 'TX/RX 增益:',
      next: '注册 Hotspot',
      no_funds: '您的帐户中的 HNT 余额不足',
      subtitle_fee: '确认此位置需要支付 10 美元的位置费用（使用 DC 支付）。',
      subtitle_free: '您的位置费用（10 美元）已预付。',
      title: '位置费用',
    },
    not_owner: {
      contact_manufacturer:
        '如果您认为自己确实是 Hotspot 拥有者（即您购买了此 Hotspot），请联系 Hotspot 制造商。',
      subtitle_1_no_follow:
        '如果您是更新 Wi-Fi 的 Hotspot 分享者，现在可以退出设置。',
      title: '此 Hotspot 已有归属。',
    },
    onboarding_error: {
      disconnected: 'Hotspot 连接出错。请重试。',
      next: '退出设置',
      title: '登录错误',
    },
    owned_hotspot: {
      subtitle_1: '您似乎已经登录此 Hotspot。',
      subtitle_2: '要更新 Hotspot 的 Wi-Fi 或位置，请前往 Hotspot 设置。',
      title: '您已经拥有此 Hotspot',
    },
    pair: {
      alert_ble_off: {
        body: '要开始配对，请开启蓝牙。保持蓝牙开启，直到完成注册。',
        title: '启用蓝牙',
      },
      alert_no_permissions: {
        body: 'Helium 需要蓝牙使用权限。您可以在“设置”中启用蓝牙权限。',
        title: '授权蓝牙',
      },
      scan: '扫描我的 Hotspot',
      title: '蓝牙',
    },
    power: {
      next: '我已开机',
      title: '开机',
    },
    progress: {
      next: '前往“钱包”',
      subtitle: '这可能需要几分钟，您可以随时关闭此屏幕。',
      title: '正在注册 Hotspot',
    },
    selection: {
      subtitle: '您想要添加什么样的 Hotspot?\n',
      title: '选择您的 Hotspot。\n',
    },
    skip_location: {
      subtitle_1: '您已决定稍后声明位置。',
      subtitle_2: '稍后在设置中更新您的位置。',
      title: '添加 Hotspot',
    },
    wifi_password: {
      connecting: '正在连接网络',
      join_title: '输入密码',
      placeholder: '密码',
      subtitle: '输入您的 Wi-Fi 凭据并将 Hotspot 连接到此网络。',
    },
    wifi_scan: {
      available_networks: '可用网络',
      disconnect: '忽略网络',
      ethernet: '改用以太网',
      not_found_desc: 'Hotspot 最多需要 3 分钟即可启动并找到可用的网络。',
      not_found_title: '找不到 Wi-Fi 网络',
      saved_networks: '配置网络',
      scan_fail_subtitle:
        '您的 Hotspot 附近没有发现 Wi-Fi 网络。检查您的路由器是否在线和附近状况。',
      scan_networks: '扫描网络',
      settings_title: 'Wi-Fi 设置',
      subtitle: '选择您想要 Hotspot 连接的 Wi-Fi 网络。',
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    empty: {
      body: '您尚未添加或关注任何 Hotspot。',
      hotspots: {},
    },
  },
  learn: {
    next: '我已阅读过指南',
  },
  more: {
    sections: {
      app: {
        signOut: '注销',
        signOutAlert: {
          body:
            '您正在注销帐户。您是否记得 12 个助记词?如果忘记了，您将无法再登录:\n\n- 您的 Hotspot\n- 您的 HNT\n- 您的钱包',
          title: '警告!',
        },
        title: '应用程序',
      },
      security: {
        authIntervals: {
          after_15_min: '15 分钟后',
          after_1_hr: '1 小时后',
          after_1_min: '1 分钟后',
          after_4_hr: '4 小时后',
          after_5_min: '5 分钟后',
          immediately: '立即',
        },
        enablePin: '启用 PIN',
        requirePin: '需要 PIN',
        resetPin: '重置 PIN',
        revealWords: '显示助记词',
        title: '安全',
      },
    },
    title: '设置',
  },
  ordinals: [
    '第 1 个',
    '第 2 个',
    '第 3 个',
    '第 4 个',
    '第 5 个',
    '第 6 个',
    '第 7 个',
    '第 8 个',
    '第 9 个',
    '第 10 个',
    '第 11 个',
    '第 12 个',
  ],
  permissions: {
    location: {
      message:
        'Helium 需要您的位置权限才能执行蓝牙发现，以启用位置声明。我们绝不会出售或与透露此信息给任何第三方。',
      title: '位置权限',
    },
  },
  wallet: {
    copiedToClipboard: '{{address}} 已复制到剪贴板',
  },
}
