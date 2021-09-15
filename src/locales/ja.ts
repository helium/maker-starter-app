export default {
  account_import: {
    alert: {
      body: 'このシードフレーズはHeliumアカウントに対応していません',
      title: 'エラー',
    },
    complete: {
      subtitle: 'これには少し時間がかかります。',
      title: 'アカウントを回復しています...',
    },
    confirm: {
      next: 'シードフレーズを申請',
      subtitle:
        '入力した12個の単語は以下のとおりです。編集する必要がある場合は、これらのいずれかをタップします。',
      title: 'シードフレーズを\n確認してください',
    },
    word_entry: {
      directions: '<b>{{ordinal}}</b>単語を入力してください',
      placeholder: '{{ordinal}}単語',
      subtitle: '回復シードフレーズは\n大文字と小文字が区別されません',
      title: '回復シードフレーズを\n入力してください',
    },
  },
  account_setup: {
    confirm: {
      failed: {
        subtitle_1: '再入力されたシードフレーズが正しくありません。',
        subtitle_2: 'もう一度実行してください。',
        title: '申し訳ありません...',
        try_again: 'もう一度実行してください',
      },
      forgot: '単語を忘れた場合',
      subtitle:
        '以下のどれがあなたの<b><purple>{{ordinal}}単語ですか？</purple></b>',
      title: '単語を\n確認',
    },
    confirm_pin: {
      subtitle: 'PINを再入力してください',
      title: 'PINを再入力してください',
    },
    create_pin: {
      subtitle: 'PINコードを設定して、アカウントを保護します。',
      title: 'PINコードを設定',
    },
    enable_notifications: {
      later: '後で設定する',
      mining: 'Hotspotはマイニングツールです',
      subtitle:
        'アカウントやHotspotに重要な更新が発生した場合に通知が届きます。',
      title: '通知を有効化',
    },
    generating: '12個の単語を生成しています...',
    passphrase: {
      next: 'これらの単語をメモしました',
      subtitle:
        'これらの<b>12個の単語はすべて順に\nメモしておく</b>必要があります。\n\n<red>Heliumはこれらの単語を回復できません。</red>',
      title: '12個の単語を使用した\nパスワード',
      warning: 'Heliumはこれらの単語を回復できません',
    },
    warning: {
      generate: '12個の単語を生成',
      subtitle:
        'Heliumアカウントは\n<b><purple>12個の一意の単語</purple></b>によって保護されています。\nこれは、サインイン時やアカウントの回復時に\nパスワードとして機能します。',
      title: '安全なアカウントを\n作成しています。',
    },
    welcome: {
      create_account: 'アカウントを開設',
      import_account: '既存のアカウントをインポート',
      subtitle:
        'Hotspotを主催して新しい暗号通貨、<b><purple>$HNT</purple></b>を\n獲得し、\nThe People’s Networkを構築しましょう。',
      title: 'Heliumへ\nようこそ',
    },
  },
  antennas: {
    elevation_info: {
      desc:
        'アンテナを地面からどのくらいの高さに配置するかを見積もります。平屋家屋の屋根にアンテナを配置する場合、高さは通常、5メートルになります。',
      title: 'Hotspotの高さ',
    },
    gain_info: {
      desc:
        '1から15までの小数点以下1桁の値。これはHotspotまたはアンテナの製造元で確認できます。',
      title: 'アンテナのTX/RXゲイン',
    },
    onboarding: {
      dbi: 'dBi',
      elevation: '高さ（メートル）',
      gain: 'TX/RXゲイン',
      select: 'アンテナを選択',
      subtitle: 'Hotspotのアンテナと高さの詳細を申請します。',
      title: 'アンテナのセットアップ',
    },
  },
  auth: {
    enter_current: '現在のPINを入力して続行してください',
    error: 'PINが正しくありません',
    title: 'PINを入力してください',
  },
  back: '戻る',
  generic: {
    active: 'アクティブ',
    address: 'アドレス',
    balance: '残高',
    blocks: 'ブロック',
    cancel: 'キャンセル',
    challenger: 'Challenger',
    clear: 'クリア',
    connect: '接続',
    continue: '続行',
    copy: 'コピー',
    done: '完了',
    error: 'エラー',
    fee: '料金',
    forget: '破棄',
    from: '開始日',
    go_back: '戻る',
    go_to_account: '「アカウント」に移動',
    go_to_settings: '「設定」に移動',
    hnt_to_currency: '{{currencyType}}。CoinGeckoのデータ',
    hotspot: 'Hotspot',
    invalid_password: 'パスワードが間違っています',
    learn_more: '詳細',
    loading: '読み込んでいます...',
    location: '位置情報',
    location_blocked:
      '位置情報がオフになっています。位置情報サービスを許可するには、携帯電話の設定に移動します。',
    minutes: '{{count}}分',
    minutes_plural: '{{count}}分',
    need_help: 'サポートが必要な場合',
    new: '新規',
    next: '次へ',
    offline: 'オフライン',
    ok: 'OK',
    online: 'オンライン',
    save: '保存',
    scan_again: '再スキャン',
    search_location: 'アドレスや場所を検索する',
    seconds: '{{count}}秒',
    seconds_plural: '{{count}}秒',
    skip: 'スキップ',
    skip_for_now: '今はスキップ',
    something_went_wrong: '何らかの問題が発生しました',
    submit: '申請',
    to: '終了日',
    unable_to_get_location: '位置情報を取得できませんでした',
    unavailable: '利用不可',
    understand: '理解しました',
    unknown: '不明',
  },
  hotspot_details: {
    challenge_sub_title: '（ウィットネス、Challenger、またはChallengee）',
    challenge_title: 'Challenges',
    checklist: 'チェックリスト',
    no_location: '位置情報がありません',
    no_location_body: 'Hotspotとペアリングをして開始します。',
    no_location_title: 'アサート済みの位置情報はありません',
    options: {
      settings: '設定',
      share: '共有',
      viewExplorer: 'エクスプローラーで表示',
    },
    overview: '概要',
    owner: '所有者：{{address}}',
    owner_you: 'あなたが所有しています',
    pass_rate: '合格率',
    percent_synced: '{{percent}}%同期されました',
    picker_options: ['過去24時間', '過去14日間', '過去30日間'],
    picker_prompt: '範囲を選択',
    picker_title: '過去',
    relay_prompt: {
      message:
        'Hotspotの接続はネットワーク上の別のHotspotを介してリレーされており、マイニングに影響する可能性があります。Hotspotがリレーされないようにするには、トラブルシューティングガイドにアクセスしてください。',
      title: 'Hotspotはリレーされています',
    },
    relayed: 'リレー済み',
    reward_title: 'HNT報酬',
    starting_sync: '同期を開始しています...',
    status_offline: '注意が必要',
    status_online: 'オンライン',
    status_prompt_offline: {
      title: 'Hotspotはオフラインになっており、同期されていません。',
    },
    status_prompt_online: {
      subtitle_active: 'ステータス：{{hotspotBlock}}/{{currentBlock}}ブロック',
      subtitle_starting: '同期を開始しています...',
      title: 'Hotspotはオンラインになっており、同期されています。',
    },
    status_syncing: '同期中',
    title: 'Hotspotの詳細',
    witness_title: '平均的なウィットネス',
  },
  hotspot_settings: {
    diagnostics: {
      activity: 'アクティビティ',
      app_version: 'アプリバージョン',
      blockchain_height_help:
        'Hotspotを100%同期してからマイニングを開始する必要があります。これにはインターネットの速度に応じて数時間以上かかる場合があります。Hotspotの電源を入れたままインターネットに接続してください。',
      blockchain_sync: 'ブロックチェーンの同期',
      email_client_missing:
        '互換性のあるインストール済みのメールクライアントが見つかりませんでした',
      eth_mac: 'イーサネットMAC',
      firmware: 'Hotspotファームウェア',
      generating_report: 'レポートを生成しています',
      help_link: 'ソリューションをもっと読む',
      hotspot_type: 'Hotspotメーカー',
      inbound: '受信',
      inbound_help:
        'ブロックチェーンのピアがHotspotに到達できません。原因としては、ルーターに問題がある、インターネット接続がない、あるいは着信接続がファイアウォールでブロックされている可能性があります。',
      ip: 'IPアドレス',
      last_challenged: '最後のChallenge',
      last_challenged_help:
        '隣接するHotspotがあなたのHotspotの位置情報を確認できません。ほとんどの場合、無線信号が到達できない領域にアンテナが配置されていることが原因です（建物がブロックしている、アンテナが下を向いている、アンテナが屋内にあるなど）。',
      nat_type: 'NATの種類',
      no_connection: '接続がありません',
      no_hotspots: 'Hotspotが見つかりませんでした',
      other_info: 'その他の情報',
      outbound: '送信',
      outbound_help:
        'Hotspotがブロックチェーンのピアに接続できません。原因としては、ルーターに問題がある、インターネット接続がない、あるいは着信接続がファイアウォールでブロックされている可能性があります。',
      p2p: 'Peer-to-Peer接続',
      report_generated: 'レポートが生成されました',
      scan_again: '再スキャン',
      send_to_support: 'サポートにレポートを送信',
      synced: '{{percent}}同期されました',
      title: '診断レポート',
      unavailable_warning:
        '*Hotspotが完全に起動するまで、診断を利用できない場合があります。データが欠落している場合は、前に戻って、診断レポートをもう一度生成してください。',
      wifi_mac: 'Wi-Fi MAC',
    },
    discovery: {
      no_location_error: {
        message:
          '検出モードを開始する前に、Hotspotの位置情報を設定してください。',
        title: '検出モードを開始できません',
      },
      subtitle: '理想的なHotspotの配置を特定します。',
      title: '検出モード',
      unasserted_hotspot_warning: {
        message:
          '応答するHotspotを視覚化するため、携帯電話の位置情報がHotspotのプレースホルダーとして使用されます。',
        title: 'Hotspotの位置情報がありません',
      },
    },
    options: {
      diagnostic: '診断',
      firmware: 'Hotspotファームウェア',
      paired: 'Hotspotとペアリング済み',
      reassert: '位置情報を更新',
      wifi: 'Wi-Fiネットワーク',
    },
    pairing: {
      scan: 'ペア',
      subtitle: '続行する前にペアリングする必要があります。',
      title: 'Wi-Fiまたは実行診断を更新',
    },
    reassert: {
      already_pending:
        'トランザクションが保留になっている間、Hotspotを更新することはできません。後でもう一度実行してください。',
      antenna_details: 'アンテナ/高さの詳細',
      assert_pending: 'アサートを保留しています...',
      change_location: '位置情報を変更',
      charge: '以下の料金が請求されます：{{amount}}。',
      confirm: '確認しました',
      confirm_location: 'Hotspotの位置情報の変更を確認してください',
      cost: '位置情報を再アサートするためのコストは以下のとおりです：',
      current_location: '現在の位置情報',
      failSubtitle: '後でもう一度実行してください',
      failTitle: 'Hotspotの再アサートに失敗しました',
      insufficient_funds:
        'このアサートを行うための資金が\nありません。HNTを取得してください。',
      new_location: '新しい位置情報',
      pending_message: '位置情報の更新を保留しています。',
      remaining:
        '<b><purple>{{count}}個の無料の</purple></b>Hotspot位置情報アサート更新が残っています。',
      remaining_plural:
        '<b><purple>{{count}}個の無料の</purple></b>Hotspot位置情報アサート更新が残っています。',
      submit:
        '申請を行い、現在保留になっているHotspotのトランザクションを更新します。',
      update_antenna: 'アンテナを更新',
    },
    title: 'Hotspot設定',
    transfer: {
      begin: 'Hotspotでデータの転送を開始',
      subtitle: '別のHeliumウォレットに送信します。',
      title: 'Hotspotでデータを転送',
    },
    update: {
      subtitle: 'Hotspotの位置情報またはアンテナの詳細。',
      title: 'Hotspotを更新',
    },
    wifi: {
      available_wifi: '利用可能なWi-Fiネットワーク',
      connected_via: '接続方法',
      ethernet: 'イーサネット',
      hide_password: 'パスワードを非表示',
      not_connected: '接続されていません',
      show_password: 'パスワードを表示',
      title: 'Wi-Fiネットワーク',
    },
  },
  hotspot_setup: {
    add_hotspot: {
      add_hotspot_error_body:
        'Add Hotspotトランザクションの構築中にエラーが発生しました。もう一度実行してください。',
      already_added:
        'このHotspotはすでにウォレットに追加されています。次の画面に進み、その位置情報をアサートしてください。',
      assert_loc_error_body:
        'Assert Locationトランザクションの構築中にエラーが発生しました。もう一度実行してください。',
      assert_loc_error_no_loc:
        '選択した位置情報が無効です。もう一度実行してください。',
      back: 'Hotspotのペアリングに戻る',
      checking_status: 'Hotspotのステータスを確認しています...',
      error:
        'Hotspotの追加を続行できません。HeliumからHotspotを購入した場合は、support@helium.comに連絡し、MACアドレス{{mac}}をお伝えください',
      help_link: 'Data Creditとは',
      label: '現在のHotspot追加料金（支払いはData Creditsで行います）',
      no_onboarding_key_message: 'もう一度実行しますか？',
      no_onboarding_key_title: 'オンボーディングキーが見つかりません',
      not_owned:
        'このHotspotを所有していないため、ウォレットに追加することはできません。',
      subtitle:
        'Hotspotを追加する場合、信頼性を確認する必要があるため、少額の料金が発生します（支払いはData Creditsで行います）。',
      support_answer:
        'Helium Network経由でデータを送信するには、Data Creditsが必要です。',
      support_title: 'Data Creditとは',
      title: 'Hotspotを追加',
      wait_error_body:
        'Hotspotマイナーが開始を待っています。数分後にもう一度実行してください。',
      wait_error_title: 'もう一度実行してください',
    },
    ble_error: {
      enablePairing: 'ペアリングモードを有効化',
      pairingInstructions:
        'Bluetoothを有効にするには、製造元のマニュアルを参照してください',
      title: 'Hotspotが見つかりませんでした',
    },
    ble_scan: {
      cancel: 'スキャンをキャンセル',
      connecting: '{{hotspotName}}に接続しています',
      title: 'Hotspotをスキャンしています',
    },
    ble_select: {
      hotspots_found: '{{count}}個のHotspotが見つかりました。',
      hotspots_found_plural: '{{count}}個のHotspotが見つかりました',
      subtitle: 'Hotspotを選択して続行します。',
    },
    confirm: {},
    diagnostics: {
      title: '診断',
    },
    disconnect_dialog: {
      body: 'Hotspotは{{wifiName}}に自動接続しなくなります。',
      title: 'ネットワークを破棄しますか？',
    },
    education: {
      cards: [
        {
          subtitle:
            'Hotspotは、他のHotspotから300メートル以上離れていて周囲に遮蔽物のない環境に配置する必要があります。 ',
          title: '遮蔽物を排除する',
        },
        {
          subtitle:
            'Hotspotはナイトテーブルや本棚にしまい込まないようにします。窓の横などに配置してください。',
          title: '閉じた場所に配置しない',
        },
        {
          subtitle:
            '近くの建物が近隣のデバイスの信号をブロックし、Hotspotが信号を受信しにくくなる場合があります。',
          title: '建物で信号がブロックされないようにする',
        },
        {
          subtitle:
            'Hotspotは金属網から離して配置するようにしてください。金属網は無線信号を著しくブロックする場合があります。',
          title: '網戸の近くに配置しない',
        },
      ],
      next: 'ガイドを読みました',
      title: 'Hotspotを\n配置しています。',
    },
    enable_location: {
      cancel: '後で設定する',
      next: 'アクセス許可をリクエストする',
      p_1:
        'まず、当社が携帯電話の位置情報にアクセスするための許可をリクエストします。',
      settings_p_1:
        'Hotspotの位置情報を更新するために、当社は位置情報に関する追加のアクセス許可が必要になります。',
      settings_p_2:
        '下のボタンをタップし、「設定」に移動します。「位置情報」で「アプリの使用時」をタップします。',
      subtitle:
        'Hotspotの位置情報を設定する必要があります。これは携帯電話を使用して行うことができます。',
      title: 'Hotspotの\n位置情報を設定',
    },
    error: {
      alertMessage:
        'サーバーへのリクエストがタイムアウトしたため、現在Hotspotを追加できません。\n\nsupport@helium.comに連絡し、MACアドレス%{mac}を伝えてください。',
      alertTitle: 'サーバーが応答できません',
    },
    ethernet: {
      next: 'Hotspotは接続されています',
      secure: 'イーサネットケーブルをしっかりと接続してください',
      subtitle:
        'インターネットルーターで利用可能なアクティブなポートに、Hotspotを接続します。',
      title: 'イーサネットを使用する',
    },
    external: {},
    firmware_update: {
      current_version: '現在のバージョン',
      explanation:
        'Hotspotは更新を自動的に確認します。これには10分程度かかる場合があります。プラグを差し込んだままにして、後でもう一度確認してください。',
      next: 'OK',
      required_version: '必要なバージョン',
      subtitle:
        '続行する前に、Hotspotのファームウェアを更新する必要があります。',
      title: '更新を利用できます',
    },
    location: {
      next: '位置情報を設定',
      title: 'Hotspotの位置情報',
    },
    location_fee: {
      balance: '残高：',
      calculating_text: 'HNTの量を計算しています',
      confirm_location:
        '選択した位置情報が正しいことを確認し、Hotspotを登録します。',
      elevation: '{{count}}メートル',
      elevation_label: '高さ：',
      elevation_plural: '{{count}}メートル',
      error_body:
        '料金データの読み込み中にエラーが発生しました。もう一度実行してください。',
      error_title: 'エラー',
      fee: '料金：',
      fee_next: '料金の支払いとHotspotの登録',
      gain: '{{gain}} dBi',
      gain_label: 'TX/RXゲイン：',
      next: 'Hotspotを登録',
      no_funds: 'アカウントのHNTの残高が不足しています',
      pending_p_1:
        'Hotspotの「位置情報を確認」トランザクションが保留中のものがブロックチェーンに存在します。',
      pending_p_2:
        'Hotspotの位置情報を変更する場合は、前のトランザクションが完了してから行ってください。',
      subtitle_fee:
        '位置情報の設定料金として10ドル（DC）を支払い、この位置情報を確認する必要があります。',
      subtitle_free: '位置情報の設定料金（10ドル）は前払いされています。',
      title: '位置情報の設定料金',
    },
    not_owner: {
      contact_manufacturer:
        'あなたがホットスポットの所有者（購入者）であると思われる場合は、Hotspotの製造元に問い合わせてください。',
      subtitle_1:
        'あなたは他のユーザーのためにこのHotspotを\nホストしてますか？',
      subtitle_1_no_follow:
        'Wi-Fiを更新しているホストの場合、今すぐセットアップを終了できます。',
      subtitle_2:
        'Hotspotをフォローすると、所有していないHotspotをアプリ内で監視できます。',
      title: 'このHotspotにはすでに所有者が存在します。',
    },
    onboarding_error: {
      body_connect_failed:
        'Hotspot Minerがリクエストに応答できません。Hotspotを再起動して、後でもう一度実行してください。',
      disconnected:
        'Hotspotへの接続中にエラーが発生しました。もう一度実行してください。',
      next: 'セットアップを終了',
      subtitle:
        'オンボーディングサーバーでHotspotが見つかりません。次の手順については、Hotspotの製造元にお問い合わせください。',
      title: 'オンボーディングエラー',
      title_connect_failed: 'Hotspotのペアリングに失敗しました',
    },
    owned_hotspot: {
      subtitle_1: 'このHotspotはすでにオンボード済みのようです。',
      subtitle_2:
        'HotspotのWi-Fiまたは位置情報を更新するには、Hotspotの設定に移動します。',
      title: 'このHotspotをすでに所有しています',
    },
    pair: {
      alert_ble_off: {
        body:
          'ペアリングを開始するには、Bluetoothをオンにします。登録が完了するまでBluetoothをオンのままにします。',
        title: 'Bluetoothを有効化',
      },
      alert_no_permissions: {
        body:
          'HeliumでBluetoothを使用するにはアクセス許可が必要です。Bluetoothのアクセス許可は「設定」で有効にできます。',
        title: 'Bluetoothのアクセスを許可',
      },
      scan: 'Hotspotをスキャン',
      title: 'Bluetooth',
    },
    power: {
      next: '電源が入っています',
      title: '電源オン',
    },
    progress: {
      next: 'ウォレットに移動',
      subtitle:
        'この処理には数分かかる場合があります。この画面は閉じてもかまいません。',
      title: 'Hotspotを登録しています',
    },
    selection: {
      subtitle: 'どのような種類のHotspotを\n追加しますか？',
      title: 'Hotspotを\n選択してください。',
    },
    skip_location: {
      subtitle_1: '後で位置情報をアサートすることにしました。',
      subtitle_2: '後で設定から位置情報を更新します。',
      title: 'Hotspotを追加',
    },
    wifi_password: {
      connecting: 'ネットワークに接続しています',
      error_title: '無効なパスワード',
      forget: '破棄',
      forget_alert_message:
        'このHotspotは、以下のものに自動接続しなくなります： ',
      forget_alert_title: 'ネットワークを破棄しますか？',
      forget_network: 'ネットワークを破棄',
      hide_password: 'パスワードを非表示',
      join_title: 'パスワードを入力',
      message:
        'Hotspotは現在、このネットワークに接続しています。パスワードを変更すると、Hotspotがオフラインになる場合があります。',
      placeholder: 'パスワード',
      show_password: 'パスワードを表示',
      subtitle:
        'Wi-Fiの資格情報を入力し、Hotspotをこのネットワークに接続してください。',
      update_title: 'Wi-Fiを更新',
    },
    wifi_scan: {
      available_networks: '利用可能なネットワーク',
      connected:
        'Hotspotは<green>オンライン</green>になっており、%{network}に接続されています。',
      connection_failed: '接続に失敗しました。もう一度実行してください',
      disconnect: 'ネットワークを破棄',
      disconnect_failed: '切断に失敗しました。もう一度実行してください',
      disconnect_help:
        'パスワードを更新するか、新しいネットワークに接続するには、まず古いネットワークを破棄してください。',
      ethernet: '代わりにイーサネットを使用する',
      not_found_desc:
        'Hotspotが起動して利用可能なネットワークを見つけるまでに、最大3分かかる場合があります。',
      not_found_title: 'Wi-Fiネットワークが見つかりません',
      saved_networks: '構成済みネットワーク',
      scan_fail_subtitle:
        'Hotspotで近隣のWi-Fiネットワークが検出できませんでした。ルーターがオンラインになっていて近隣に設置されていることを確認してください。',
      scan_networks: 'ネットワークをスキャン',
      settings_title: 'Wi-Fi設定',
      subtitle: 'Hotspotを接続するWi-Fiネットワークを選択します。',
      tip:
        '<blue>Wi-Fiが非表示に設定されている</blue>かどうかを確認しましたか？',
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    empty: {
      body: 'まだHotspotを追加もフォローもしていません。',
      failed:
        'APIまたはネットワークの停止により、Hotspotのアクセスに問題が発生しています。後でもう一度実行してください。',
      hotspots: {},
    },
    list: {
      no_offline: 'オフラインHotspotはありません',
      no_results: '結果はありません',
      online: 'オンラインHotspot',
    },
    new: {
      explorer: '周辺にあるHotspotを表示する',
      setup: 'Hotspotを設定',
      subtitle:
        'Hotspotを追加したばかりである場合は、しっかりと設置してください。ネットワークにHotspotが伝播するまでに少し時間がかかります。',
      title: '新しいHotspotを追加',
    },
    owned: {
      filter: {
        earn: '獲得数上位のHotspot',
        followed: 'フォローしたHotspot',
        near: '最も近いHotspot',
        new: '最新のHotspot',
        offline: 'オフラインHotspot',
      },
      reward_summary: 'Hotspotは過去24時間で\n{{hntAmount}}を獲得しました。',
      reward_summary_plural:
        '{{count}}個のHotspotは過去24時間で\n{{hntAmount}}を獲得しました。',
      title: 'Hotspot',
      title_no_hotspots: 'Hotspot',
      your_hotspots: 'Hotspot',
    },
    search: {
      all_hotspots: 'すべてのHotspot',
      my_hotspots: 'Hotspot',
      placeholder: '検索...',
      recent_searches: '最近の検索',
      tips: '検索のヒント',
      tips_body:
        'Hotspot名（愉快な動物の名前など）または地名（ニューヨーク市など）を入力してみてください。\n\n注：過去10分以内に追加されたHotspotは表示されない場合があります。',
      title: 'Hotspot検索',
    },
    sort_by: 'Hotspotを次でソートする',
    ticker:
      '{{formattedHotspotCount}}個のHotspot • Oracleの価格：{{oraclePrice}} • ブロック時間：{{formattedBlockTime}}秒 • ',
    ticker_no_block:
      '{{formattedHotspotCount}}個のHotspot • Oracleの価格：{{oraclePrice}} • ',
  },
  learn: {
    next: 'ガイドを読みました',
    slides: [
      {
        bottomBody:
          'ビーコンはHotspotによって送信される特別なパケットです。隣接する他のHotspotはこれらのパケットをリッスンできます。\n\nこの信号により、ネットワークはどのHotspotがどのHotspotの受信範囲内に存在するのかを特定できます。隣接するHotspotは「ウィットネス」と呼ばれます。あなたのビーコンをリッスンするHotspotは、ウィットネスリストに追加されます。',
        bottomTitle: 'ビーコンの仕組みは？',
        topBody: 'Hotspotは近隣にあるHotspotのビーコンをリッスンします',
        topTitle: 'ビーコンをリッスンする',
      },
      {
        bottomBody:
          'ビーコンはHotspotによって送信される特別なパケットです。隣接する他のHotspotはこれらのパケットをリッスンできます。\n\nこの信号により、ネットワークはどのHotspotがどのHotspotの受信範囲内に存在するのかを特定できます。隣接するHotspotは「ウィットネス」と呼ばれます。あなたのビーコンをリッスンするHotspotは、ウィットネスリストに追加されます。',
        bottomTitle: 'ビーコンの仕組みは？',
        topBody: 'Hotspotは近隣にあるHotspotのビーコンをリッスンします',
        topTitle: 'ビーコンをリッスンする',
      },
      {
        bottomBody:
          'ビーコンはHotspotによって送信される特別なパケットです。隣接する他のHotspotはこれらのパケットをリッスンできます。\n\nこの信号により、ネットワークはどのHotspotがどのHotspotの受信範囲内に存在するのかを特定できます。隣接するHotspotは「ウィットネス」と呼ばれます。あなたのビーコンをリッスンするHotspotは、ウィットネスリストに追加されます。',
        bottomTitle: 'ビーコンの仕組みは？',
        topBody: 'Hotspotは近隣にあるHotspotのビーコンをリッスンします',
        topTitle: 'ビーコンをリッスンする',
      },
    ],
    title: 'HNTを獲得する\n方法は？',
  },
  more: {
    sections: {
      app: {
        convertHntToCurrency: 'HNTを通貨に変換する',
        enableHapticFeedback: '触覚フィードバックを有効にする',
        language: '言語',
        signOut: 'サインアウト',
        signOutAlert: {
          body:
            'アカウントからサインアウトしています。回復用の12個の単語をお持ちですか？お持ちでない場合、以下にアクセスできなくなります。\n\n - Hotspot\n- HNT\n - ウォレット',
          title: '警告！',
        },
        title: 'アプリ',
      },
      learn: {
        coverage: 'ネットワークカバレッジ',
        heliumtoken: 'Helium Token',
        hotspotPlacement: 'Hotspotの配置',
        joinDiscord: 'Helium Discordに参加',
        support: 'サポート',
        title: '詳細',
        tokenEarnings: '獲得したトークン',
        troubleshooting: 'トラブルシューティング',
      },
      security: {
        authIntervals: {
          after_15_min: '15分後',
          after_1_hr: '1時間後',
          after_1_min: '1分後',
          after_4_hr: '4時間後',
          after_5_min: '5分後',
          immediately: '今すぐ',
        },
        enablePin: 'PINを有効化',
        requirePin: 'PINを要求',
        requirePinForPayments: '支払い用のPINを要求',
        resetPin: 'PINをリセット',
        revealWords: '単語を表示',
        title: 'セキュリティ',
      },
    },
    title: '設定',
  },
  ordinals: [
    '1番目',
    '2番目',
    '3番目',
    '4番目',
    '5番目',
    '6番目',
    '7番目',
    '8番目',
    '9番目',
    '10番目',
    '11番目',
    '12番目',
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
    copiedToClipboard: '{{address}}をクリップボードにコピーしました',
    intro_body:
      'このアカウントタブは、保持しているHNTまたはData Credit用の仮想ウォレットとして機能します。',
    intro_slides: [
      {
        body: 'アドレスまたは QR コードにアクセスします。',
        title: 'HNTを受信',
      },
      {
        body: 'QRコードをスキャンするか、手動で詳細を入力します。',
        title: 'HNT を送信',
      },
      {
        body:
          '緑色はHNTがアカウントに<green>追加されている</green>ことを示します。',
        title: 'アカウントのグラフを作成',
      },
      {
        body:
          '青色はHNTがアカウントから<blue>引き出されている</blue>ことを示します。',
        title: 'アカウントのグラフを作成',
      },
    ],
    share: '共有',
    title: 'ウォレット',
  },
}
