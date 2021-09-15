export default {
  account_import: {
    alert: {
      body: 'このシードフレーズはHeliumアカウントに対応していません',
      title: 'エラー',
    },
    complete: {
      title: 'アカウントを回復しています...',
    },
    confirm: {
      next: 'シードフレーズを申請',
      subtitle:
        '入力した12個の単語は以下のとおりです。編集する必要がある場合は、これらのいずれかをタップします。',
      title: 'シードフレーズを\n確認してください',
    },
    word_entry: {
      placeholder: '{{ordinal}}単語',
      subtitle: '回復シードフレーズは\n大文字と小文字が区別されません',
      title: '回復シードフレーズを\n入力してください',
    },
  },
  account_setup: {
    confirm: {
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
    generating: '12個の単語を生成しています...',
    passphrase: {
      next: 'これらの単語をメモしました',
      subtitle:
        'これらの<b>12個の単語はすべて順に\nメモしておく</b>必要があります。\n\n<red>Heliumはこれらの単語を回復できません。</red>',
      title: '12個の単語を使用した\nパスワード',
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
    title: 'PINを入力してください',
  },
  back: '戻る',
  generic: {
    cancel: 'キャンセル',
    clear: 'クリア',
    connect: '接続',
    continue: '続行',
    error: 'エラー',
    forget: '破棄',
    go_to_settings: '「設定」に移動',
    invalid_password: 'パスワードが間違っています',
    next: '次へ',
    ok: 'OK',
    scan_again: '再スキャン',
    search_location: 'アドレスや場所を検索する',
    skip_for_now: '今はスキップ',
    something_went_wrong: '何らかの問題が発生しました',
    understand: '理解しました',
    unknown: '不明',
  },
  hotspot_details: {
    no_location_body: 'Hotspotとペアリングをして開始します。',
    no_location_title: 'アサート済みの位置情報はありません',
  },
  hotspot_settings: {
    wifi: {
      hide_password: 'パスワードを非表示',
      show_password: 'パスワードを表示',
    },
  },
  hotspot_setup: {
    add_hotspot: {
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
      title: 'Hotspotを\n配置しています。',
    },
    enable_location: {
      cancel: '後で設定する',
      next: 'アクセス許可をリクエストする',
      p_1:
        'まず、当社が携帯電話の位置情報にアクセスするための許可をリクエストします。',
      subtitle:
        'Hotspotの位置情報を設定する必要があります。これは携帯電話を使用して行うことができます。',
      title: 'Hotspotの\n位置情報を設定',
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
      confirm_location:
        '選択した位置情報が正しいことを確認し、Hotspotを登録します。',
      elevation: '{{count}}メートル',
      elevation_label: '高さ：',
      elevation_plural: '{{count}}メートル',
      fee: '料金：',
      fee_next: '料金の支払いとHotspotの登録',
      gain: '{{gain}} dBi',
      gain_label: 'TX/RXゲイン：',
      next: 'Hotspotを登録',
      no_funds: 'アカウントのHNTの残高が不足しています',
      subtitle_fee:
        '位置情報の設定料金として10ドル（DC）を支払い、この位置情報を確認する必要があります。',
      subtitle_free: '位置情報の設定料金（10ドル）は前払いされています。',
      title: '位置情報の設定料金',
    },
    not_owner: {
      contact_manufacturer:
        'あなたがホットスポットの所有者（購入者）であると思われる場合は、Hotspotの製造元に問い合わせてください。',
      subtitle_1_no_follow:
        'Wi-Fiを更新しているホストの場合、今すぐセットアップを終了できます。',
      title: 'このHotspotにはすでに所有者が存在します。',
    },
    onboarding_error: {
      disconnected:
        'Hotspotへの接続中にエラーが発生しました。もう一度実行してください。',
      next: 'セットアップを終了',
      title: 'オンボーディングエラー',
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
      join_title: 'パスワードを入力',
      placeholder: 'パスワード',
      subtitle:
        'Wi-Fiの資格情報を入力し、Hotspotをこのネットワークに接続してください。',
    },
    wifi_scan: {
      available_networks: '利用可能なネットワーク',
      disconnect: 'ネットワークを破棄',
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
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    empty: {
      body: 'まだHotspotを追加もフォローもしていません。',
      hotspots: {},
    },
  },
  learn: {
    next: 'ガイドを読みました',
  },
  more: {
    sections: {
      app: {
        language: '言語',
        signOut: 'サインアウト',
        signOutAlert: {
          body:
            'アカウントからサインアウトしています。回復用の12個の単語をお持ちですか？お持ちでない場合、以下にアクセスできなくなります。\n\n - Hotspot\n- HNT\n - ウォレット',
          title: '警告！',
        },
        title: 'アプリ',
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
  permissions: {
    location: {
      message:
        'Bluetoothを検出して位置情報のアサートを有効にするために、Heliumはあなたの位置情報にアクセスする必要があります。この情報が販売または共有されることは決してありません。',
      title: '位置情報のアクセス許可',
    },
  },
  wallet: {
    copiedToClipboard: '{{address}}をクリップボードにコピーしました',
  },
}
