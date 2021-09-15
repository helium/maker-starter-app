export default {
  account_import: {
    alert: {
      body: '该助记词不匹配任何 Helium 帐户',
      title: '出错',
    },
    complete: {
      subtitle: '请稍候。',
      title: '正在恢复帐户...',
    },
    confirm: {
      next: '提交助记词',
      subtitle: '您输入了以下 12 个助记词。如需编辑，请点击任一个。',
      title: '请确认助记词\n',
    },
    word_entry: {
      directions: '输入第 <b>{{ordinal}}</b> 个助记词',
      placeholder: '第 {{ordinal}} 个助记词',
      subtitle: '恢复助记词不区分大小写\n',
      title: '输入恢复\n助记词',
    },
  },
  account_setup: {
    confirm: {
      failed: {
        subtitle_1: '您重新输入的助记词不正确。',
        subtitle_2: '请重试。',
        title: '很抱歉...',
        try_again: '再试一次',
      },
      forgot: '我忘记了助记词',
      subtitle: '以下哪个词是您的<b><purple>{{ordinal}}助记词?</purple></b>',
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
    enable_notifications: {
      later: '不，谢谢，稍后设置',
      mining: 'Hotspot 正在挖矿中',
      subtitle: '如果您的帐户或 Hotspot 有重要更新，您会收到提醒通知。',
      title: '启用通知',
    },
    generating: '正在生成您的 12 个助记词...',
    passphrase: {
      next: '我已记下了',
      subtitle:
        '请务必按顺序<b>记下这\n12 个助记词</b>，\n\n<red>Helium 无法恢复这些助记词。</red>',
      title: '您的 12 个助记词密码\n',
      warning: 'Helium 无法恢复这些助记词',
    },
    warning: {
      generate: '生成我的 12 个助记词',
      subtitle:
        'Helium 帐户受到\n<b><purple>12 个独特助记词</purple></b>的保护，作为登录或恢复帐户的密码。\n\n',
      title: '正在创建安全帐户。\n',
    },
    welcome: {
      create_account: '新建帐户',
      import_account: '导入现有帐户',
      subtitle:
        '玩转 Hotspot，赚取 <b><purple>Helium 币</purple></b>（一种新型加密货币），参与搭建 People’s Network。\n\n',
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
    error: 'PIN 码不正确',
    title: '输入 PIN 码',
  },
  back: '返回',
  generic: {
    active: '活跃',
    address: '地址',
    balance: '您的余额',
    blocks: '区块',
    cancel: '取消',
    challenger: 'Challenger',
    clear: '清除',
    connect: '连接',
    continue: '继续',
    copy: '复制',
    done: '已完成',
    error: '出错',
    fee: '费用',
    forget: '忘记',
    from: '从',
    go_back: '返回',
    go_to_account: '前往“我的帐户”',
    go_to_settings: '前往“设置”',
    hnt_to_currency: '{{currencyType}}。来自 CoinGecko 的数据',
    hotspot: 'Hotspot',
    invalid_password: '您的密码不正确',
    learn_more: '了解更多',
    loading: '正在加载...',
    location: '位置',
    location_blocked: '位置功能已关闭。前往手机设置打开位置服务。',
    minutes: '{{count}} 分钟',
    minutes_plural: '{{count}} 分钟',
    need_help: '我需要帮助',
    new: '新建',
    next: '下一个',
    offline: '离线',
    ok: '确定',
    online: '在线',
    save: '保存',
    scan_again: '重新扫描',
    search_location: '搜索地址或位置',
    seconds: '{{count}} 秒',
    seconds_plural: '{{count}} 秒',
    skip: '跳过',
    skip_for_now: '暂时跳过',
    something_went_wrong: '出现错误',
    submit: '提交',
    to: '至',
    unable_to_get_location: '我们无法获取您的位置',
    unavailable: '不可用',
    understand: '我知道了',
    unknown: '未知',
  },
  hotspot_details: {
    challenge_sub_title: '（见证人、challenger 或 challengee）',
    challenge_title: 'Challenges',
    checklist: '检查清单',
    no_location: '无位置',
    no_location_body: 'Hotspot 配对开始。',
    no_location_title: '没有声明位置',
    options: {
      settings: '设置',
      share: '分享',
      viewExplorer: '通过浏览器查看',
    },
    overview: '概览',
    owner: '拥有者: {{address}}',
    owner_you: '你拥有',
    pass_rate: '通过率',
    percent_synced: '{{percent}}% 已同步',
    picker_options: ['过去 24 小时', '过去 14 天', '过去 30 天'],
    picker_prompt: '选择范围',
    picker_title: '过去',
    relay_prompt: {
      message:
        'Hotspot 连接正通过网络中另一个 Hotspot 进行中转，可能会影响挖矿。要解除 Hotspot 中转，请访问故障排除指南。',
      title: 'Hotspot 已中转',
    },
    relayed: '已中转',
    reward_title: 'HNT 奖励',
    starting_sync: '开始同步...',
    status_offline: '请注意',
    status_online: '在线',
    status_prompt_offline: {
      title: 'Hotspot 离线且未同步。',
    },
    status_prompt_online: {
      subtitle_active: '状态:区块 {{hotspotBlock}} ({{currentBlock}})',
      subtitle_starting: '开始同步...',
      title: 'Hotspot 处于在线同步状态。',
    },
    status_syncing: '正在同步',
    title: 'Hotspot 详细信息',
    witness_title: '普通见证人',
  },
  hotspot_settings: {
    diagnostics: {
      activity: '活动',
      app_version: '应用程序版本',
      blockchain_height_help:
        'Hotspot 必须先完成同步才能开始挖矿。此操作可能花费几个小时或更多时间，具体取决于网速。保持 Hotspot 处于开启状态并联网。',
      blockchain_sync: '区块链同步',
      email_client_missing: '找不到已安装的兼容电子邮件客户端',
      eth_mac: '以太网 MAC',
      firmware: 'Hotspot 固件',
      generating_report: '正在生成报告',
      help_link: '阅读更多寻求其他可行解决方案',
      hotspot_type: 'Hotspot Maker',
      inbound: '入站',
      inbound_help:
        '区块链对等点无法到达 Hotspot。可能是路由器故障、无互联网连接或防火墙阻止了外部连接。',
      ip: 'IP 地址',
      last_challenged: '上次 Challenge',
      last_challenged_help:
        '邻近 Hotspot 无法核实您的 Hotspot 位置。在大多数情况下，出现此问题的原因在于天线的无线电信号无法达到某个区域（例如建筑物阻挡、天线指向下方或天线位于室内等）。',
      nat_type: 'NAT 类型',
      no_connection: '无连接',
      no_hotspots: '找不到 Hotspot',
      other_info: '其他信息',
      outbound: '出站',
      outbound_help:
        'Hotspot 无法连接到区块链上的对等点。可能是路由器故障、无互联网连接或防火墙阻止了外部连接。',
      p2p: 'Peer-to-Peer 连接',
      report_generated: '生成的报告',
      scan_again: '重新扫描',
      send_to_support: '发送报告至支持部门',
      synced: '{{percent}} 已同步',
      title: '诊断报告',
      unavailable_warning:
        '* Hotspot 必须完全启动才能使用诊断功能。若发现数据有丢失，请返回并重新生成诊断报告。',
      wifi_mac: 'Wi-Fi MAC',
    },
    discovery: {
      no_location_error: {
        message: '请先设置 Hotspot 位置再开启发现模式。',
        title: '无法开启发现模式',
      },
      subtitle: '确定最佳 Hotspot 位置。',
      title: '发现模式',
      unasserted_hotspot_warning: {
        message:
          '为实现 Hotspot 响应的可视化，我们将使用您的电话位置作为 Hotspot 占位符。',
        title: 'Hotspot 未设定位置',
      },
    },
    options: {
      diagnostic: '诊断',
      firmware: 'Hotspot 固件',
      paired: 'Hotspot 配对',
      reassert: '更新位置',
      wifi: 'Wi-Fi 网络',
    },
    pairing: {
      scan: '配对',
      subtitle: '必须进行配对才能继续。',
      title: '更新 Wi-Fi 或运行诊断',
    },
    reassert: {
      already_pending: '无法更新 Hotspot，存在待处理交易。请稍后重试。',
      antenna_details: '天线/高度详细信息',
      assert_pending: '声明待处理...',
      change_location: '更改位置',
      charge: '需要收取 {{amount}}。',
      confirm: '我确认',
      confirm_location: '请确认您的 Hotspot 位置更改',
      cost: '重新声明位置的费用为:',
      current_location: '当前位置',
      failSubtitle: '请稍后重试',
      failTitle: '重新声明 Hotspot 失败',
      insufficient_funds: '您没有可用资金进行此次声明。\n获取 HNT。',
      new_location: '新位置',
      pending_message: '位置更新待处理。',
      remaining:
        '您还剩下 <b><purple>{{count}} 次免费的</purple></b> Hotspot 位置声明更新。',
      remaining_plural:
        '您还剩下 <b><purple>{{count}} 次免费的</purple></b> Hotspot 位置声明更新。',
      submit: '更新已提交且待处理的 Hotspot 交易。',
      update_antenna: '更新天线',
    },
    title: 'Hotspot 设置',
    transfer: {
      begin: '开始 Hotspot 转让',
      subtitle: '发送到另一个 Helium 钱包。',
      title: '转让 Hotspot',
    },
    update: {
      subtitle: 'Hotspot 位置或天线详细信息。',
      title: '更新 Hotspot',
    },
    wifi: {
      available_wifi: '可用的 Wi-Fi 网络',
      connected_via: '连接方式',
      ethernet: '以太网',
      hide_password: '隐藏密码',
      not_connected: '未连接',
      show_password: '显示密码',
      title: 'Wi-Fi 网络',
    },
  },
  hotspot_setup: {
    add_hotspot: {
      add_hotspot_error_body: '构建“添加 Hotspot”事务时出错。请重试。',
      already_added:
        '您已经将此 Hotspot 添加至您的钱包。进入下一页，声明 Hotspot 位置。',
      assert_loc_error_body: '构建“声明位置”事务时出错。请重试。',
      assert_loc_error_no_loc: '所选位置无效。请重试。',
      back: '返回 Hotspot 配对',
      checking_status: '正在检查 Hotspot 状态...',
      error:
        '无法继续添加 Hotspot。如果您是从 Helium 购买的 Hotspot，请联系 support@helium.com 并附上 mac 地址 {{mac}}',
      help_link: '什么是 Data Credits?',
      label: '当前添加 HOTSPOT 费用（使用 Data Credits 支付）',
      no_onboarding_key_message: '是否重试?',
      no_onboarding_key_title: '未找到登录密钥',
      not_owned: '您尚未拥有此 Hotspot ，无法将其添加到钱包。',
      subtitle:
        '添加 Hotspot 需支付小额费用（使用 Data Credits 支付）进行身份验证。',
      support_answer: '通过 Helium 网络发送数据时需要支付 Data Credits。',
      support_title: '什么是 Data Credits?',
      title: '添加 Hotspot',
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
      connecting: '正在连接 {{hotspotName}}',
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
    disconnect_dialog: {
      body: 'Hotspot 将不再自动连接到 {{wifiName}}。',
      title: '要忽略网络?',
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
      next: '我已阅读过指南',
      title: '放置\n您的 Hotspot。',
    },
    enable_location: {
      cancel: '不，谢谢，稍后设置',
      next: '请求权限',
      p_1: '首先，我们需要您手机的位置权限。',
      settings_p_1: '要更新 Hotspot 位置，我们需要更多位置权限。',
      settings_p_2:
        '点击下方按钮进入“设置”。在“位置”下，点击“使用应用程序时”。',
      subtitle:
        '我们需要为您的 Hotspot 设定位置。可以通过您的手机完成这一操作。',
      title: '设定 Hotspot\n位置',
    },
    error: {
      alertMessage:
        '服务器请求已超时，我们目前无法添加您的 Hotspot。\n\n请联系 support@helium.com 并记下 MAC 地址 %{mac}。',
      alertTitle: '服务器无法响应',
    },
    ethernet: {
      next: '我的 Hotspot 已连接',
      secure: '请安全连接以太网线',
      subtitle: '将 Hotspot 设备插入活跃可用的路由器端口。',
      title: '使用以太网',
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
      calculating_text: '正在计算 HNT 金额',
      confirm_location: '确认所选位置正确无误，然后注册您的 Hotspot.。',
      elevation: '{{count}} 米',
      elevation_label: '高度:',
      elevation_plural: '{{count}} 米',
      error_body: '加载费用数据时出错。请重试。',
      error_title: '出错',
      fee: '费用:',
      fee_next: '支付费用并注册 Hotspot',
      gain: '{{gain}} dBi',
      gain_label: 'TX/RX 增益:',
      next: '注册 Hotspot',
      no_funds: '您的帐户中的 HNT 余额不足',
      pending_p_1: '您的 Hotspot 在区块链中有一个待处理的确认位置交易。',
      pending_p_2: '若想变更 Hotspot 位置，请等候上一个交易完成再更新位置。',
      subtitle_fee: '确认此位置需要支付 10 美元的位置费用（使用 DC 支付）。',
      subtitle_free: '您的位置费用（10 美元）已预付。',
      title: '位置费用',
    },
    not_owner: {
      contact_manufacturer:
        '如果您认为自己确实是 Hotspot 拥有者（即您购买了此 Hotspot），请联系 Hotspot 制造商。',
      subtitle_1: '或许您是以他人名义托管?\n',
      subtitle_1_no_follow:
        '如果您是更新 Wi-Fi 的 Hotspot 分享者，现在可以退出设置。',
      subtitle_2:
        '关注 Hotspot，您即可在应用程序内监控当前不为您所有的 Hotspot。',
      title: '此 Hotspot 已有归属。',
    },
    onboarding_error: {
      body_connect_failed:
        'Hotspot Miner 无法响应请求。请重新启动 Hotspot 并重试。',
      disconnected: 'Hotspot 连接出错。请重试。',
      next: '退出设置',
      subtitle: '无法在登录服务器上找到 Hotspot。请联系 Hotspot 制造商以继续。',
      title: '登录错误',
      title_connect_failed: 'Hotspot 配对失败',
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
      error_title: '密码无效',
      forget: '忘记',
      forget_alert_message: 'Hotspot 将不再自动连接到 ',
      forget_alert_title: '要忽略网络?',
      forget_network: '忽略网络',
      hide_password: '隐藏密码',
      join_title: '输入密码',
      message: 'Hotspot 当前已连接到此网络。更改密码可能导致 Hotspot 离线。',
      placeholder: '密码',
      show_password: '显示密码',
      subtitle: '输入您的 Wi-Fi 凭据并将 Hotspot 连接到此网络。',
      update_title: '更新 Wi-Fi',
    },
    wifi_scan: {
      available_networks: '可用网络',
      connected:
        '您的 Hotspot 处于<green>在线</green>状态，已连接至 %{network}。',
      connection_failed: '连接失败，请重试',
      disconnect: '忽略网络',
      disconnect_failed: '断开连接失败，请重试',
      disconnect_help: '要更新密码或连接到新的网络，请先忽略旧的网络。',
      ethernet: '改用以太网',
      not_found_desc: 'Hotspot 最多需要 3 分钟即可启动并找到可用的网络。',
      not_found_title: '找不到 Wi-Fi 网络',
      saved_networks: '配置网络',
      scan_fail_subtitle:
        '您的 Hotspot 附近没有发现 Wi-Fi 网络。检查您的路由器是否在线和附近状况。',
      scan_networks: '扫描网络',
      settings_title: 'Wi-Fi 设置',
      subtitle: '选择您想要 Hotspot 连接的 Wi-Fi 网络。',
      tip: '确认检查过您的 <blue>Wi-Fi 是否被设置为“隐藏”</blue>?',
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    empty: {
      body: '您尚未添加或关注任何 Hotspot。',
      failed: '由于 API 或网络中断，我们无法获取您的 Hotspot。请稍后重试。',
      hotspots: {},
    },
    list: {
      no_offline: '没有离线 Hotspot',
      no_results: '无结果',
      online: '在线 Hotspot',
    },
    new: {
      explorer: '查看我周围的 Hotspot',
      setup: '设置 Hotspot',
      subtitle:
        '添加新的 Hotspot 后，请稍待片刻。网络需要一些时间来传播此 Hotspot。',
      title: '添加新的 Hotspot',
    },
    owned: {
      filter: {
        earn: '收益最高的 Hotspot',
        followed: '已关注的 Hotspot',
        near: '最近的 Hotspot',
        new: '最新的 Hotspot',
        offline: '离线 Hotspot',
      },
      reward_summary: '您的 Hotspot 过去 24 小时共赚取\n{{hntAmount}}。',
      reward_summary_plural:
        '您的 {{count}} 个 Hotspot 过去 24 小时共赚取\n{{hntAmount}}。',
      title: '我的 Hotspot',
      title_no_hotspots: 'Hotspot',
      your_hotspots: '您的 Hotspot',
    },
    search: {
      all_hotspots: '全部 Hotspot',
      my_hotspots: '我的 Hotspot',
      placeholder: '搜索...',
      recent_searches: '近期搜索',
      tips: '搜索技巧',
      tips_body:
        '尝试输入 Hotspot 名称（例如张三）或地名（例如上海市）。\n\n注意:10 分钟内添加的 Hotspot 可能无法显示。',
      title: 'Hotspot 搜索',
    },
    sort_by: 'Hotspot 排序方式',
    ticker:
      '{{formattedHotspotCount}} Hotspot • Oracle 价格: {{oraclePrice}} • 区块时间: {{formattedBlockTime}} 秒 • ',
    ticker_no_block:
      '{{formattedHotspotCount}} Hotspot • Oracle 价格: {{oraclePrice}} • ',
  },
  learn: {
    next: '我已阅读过指南',
    slides: [
      {
        bottomBody:
          '信标是由 Hotspot 发送的特殊数据包，任何其他邻近的 Hotspot 均可监听到。\n\n本网络通过这些信号确定哪些 Hotspot 在相互的接收范围内。这些“邻居”被称作“见证人”，监听您信标的 Hotspot 会添加到您的“见证人列表”中。',
        bottomTitle: '信标如何运作?',
        topBody: '您的 Hotspot 将监听邻近 Hotspot 的信标',
        topTitle: '监听信标',
      },
      {
        bottomBody:
          '信标是由 Hotspot 发送的特殊数据包，任何其他邻近的 Hotspot 均可监听到。\n\n本网络通过这些信号确定哪些 Hotspot 在相互的接收范围内。这些“邻居”被称作“见证人”，监听您信标的 Hotspot 会添加到您的“见证人列表”中。',
        bottomTitle: '信标如何运作?',
        topBody: '您的 Hotspot 将监听邻近 Hotspot 的信标',
        topTitle: '监听信标',
      },
      {
        bottomBody:
          '信标是由 Hotspot 发送的特殊数据包，任何其他邻近的 Hotspot 均可监听到。\n\n本网络通过这些信号确定哪些 Hotspot 在相互的接收范围内。这些“邻居”被称作“见证人”，监听您信标的 Hotspot 会添加到您的“见证人列表”中。',
        bottomTitle: '信标如何运作?',
        topBody: '您的 Hotspot 将监听邻近 Hotspot 的信标',
        topTitle: '监听信标',
      },
    ],
    title: '如何赚取\nHNT?',
  },
  more: {
    sections: {
      app: {
        convertHntToCurrency: '将 HNT 转换为货币',
        enableHapticFeedback: '启用触觉反馈',
        language: '语言',
        signOut: '注销',
        signOutAlert: {
          body:
            '您正在注销帐户。您是否记得 12 个助记词?如果忘记了，您将无法再登录:\n\n- 您的 Hotspot\n- 您的 HNT\n- 您的钱包',
          title: '警告!',
        },
        title: '应用程序',
      },
      learn: {
        coverage: '网络覆盖',
        heliumtoken: 'Helium 代币',
        hotspotPlacement: 'Hotspot 部署',
        joinDiscord: '加入 Helium Discord',
        support: '支持',
        title: '学习',
        tokenEarnings: '代币收入',
        troubleshooting: '故障排除',
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
        requirePinForPayments: '付款需要输入 PIN',
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
    copiedToClipboard: '{{address}} 已复制到剪贴板',
    intro_body:
      '此“帐户”选项卡可作为虚拟钱包存放您所持有的任何 HNT 或 Data Credits。',
    intro_slides: [
      {
        body: '访问您的地址或二维码。',
        title: '收取 HNT',
      },
      {
        body: '扫描二维码或手动输入详细信息。',
        title: '发送 HNT',
      },
      {
        body: '绿色表示您的帐户正在<green>增加</green>的 HNT。',
        title: '显示帐户明细表',
      },
      {
        body: '蓝色表示您的帐户正在<blue>减少</blue>的 HNT。',
        title: '显示帐户明细表',
      },
    ],
    share: '分享',
    title: '我的钱包',
  },
}
