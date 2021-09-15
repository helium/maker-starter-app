export default {
  account_import: {
    alert: {
      body: '이 시드 문구는 Helium 계정과 일치하지 않습니다',
      title: '오류 발생',
    },
    complete: {
      title: '계정 복구 중...',
    },
    confirm: {
      next: '시드 문구 제출',
      subtitle:
        '입력하신 12개의 단어입니다. 수정이 필요한 경우 이 중 하나를 탭하세요.',
      title: '시드 문구\n확인',
    },
    word_entry: {
      placeholder: '{{ordinal}} 단어',
      subtitle: '복구 시드 문구는\n대소문자를 구분하지 않음',
      title: '복구 시드\n문구 입력',
    },
  },
  account_setup: {
    confirm: {
      forgot: '단어를 잊어버림',
      title: '단어를\n확인하세요',
    },
    confirm_pin: {
      subtitle: 'PIN을 다시 입력하세요',
      title: 'PIN 반복',
    },
    create_pin: {
      subtitle: 'PIN 코드로 계정을 보호하세요.',
      title: 'PIN 코드 설정',
    },
    generating: '12개의 단어 생성 중...',
    passphrase: {
      next: '단어를 모두 적었습니다',
      title: '12단어\n암호',
    },
    warning: {
      generate: '12개의 단어 생성',
      title: '보안 계정\n생성.',
    },
    welcome: {
      create_account: '계정 생성',
      import_account: '기존 계정 가져오기',
      title: 'Helium에 오신 것을\n환영합니다',
    },
  },
  antennas: {
    elevation_info: {
      desc:
        '안테나가 지면에 비해 얼마나 높은지 추정하세요. 단층집의 지붕에 있는 안테나는 일반적으로 5미터입니다.',
      title: 'Hotspot 높이',
    },
    gain_info: {
      desc:
        '1과 15 사이에서 소수점 한 자리까지의 값입니다. Hotspot 또는 안테나 제조업체에서 제공합니다.',
      title: '안테나 TX / RX 증가',
    },
    onboarding: {
      dbi: 'dBi',
      elevation: '높이 (미터)',
      gain: 'TX / RX 증가',
      select: '안테나 선택',
      subtitle: 'Hotspot의 안테나 및 높이 세부 정보를 제출하세요.',
      title: '안테나 설정',
    },
  },
  auth: {
    enter_current: '계속하려면 현재 PIN을 입력하세요',
    title: 'PIN 입력',
  },
  back: '돌아가기',
  generic: {
    cancel: '취소',
    clear: '지우기',
    connect: '연결',
    continue: '계속',
    error: '오류 발생',
    forget: '잊어버림',
    go_to_settings: '설정으로 이동',
    invalid_password: '잘못된 암호입니다',
    next: '다음',
    ok: '확인',
    scan_again: '다시 스캔',
    search_location: '주소 또는 장소 검색',
    skip_for_now: '지금은 건너뛰기',
    something_went_wrong: '문제가 발생했습니다',
    understand: '내용을 이해함',
    unknown: '알 수 없음',
  },
  hotspot_details: {
    no_location_body: '시작하려면 Hotspot과 페어링하세요.',
    no_location_title: '확인된 위치 없음',
  },
  hotspot_settings: {
    wifi: {
      hide_password: '암호 숨기기',
      show_password: '암호 표시',
    },
  },
  hotspot_setup: {
    add_hotspot: {
      wait_error_body:
        'Hotspot Miner가 시작을 기다리고 있습니다. 몇 분 후에 다시 시도해 주세요.',
      wait_error_title: '다시 시도해 주세요',
    },
    ble_error: {
      enablePairing: '페어링 모드 활성화',
      pairingInstructions:
        'Bluetooth를 활성화하려면 제조업체 지침을 참조하세요',
      title: 'Hotspot을 찾을 수 없음',
    },
    ble_scan: {
      cancel: '스캔 취소',
      title: 'Hotspot 스캔',
    },
    ble_select: {
      hotspots_found: 'Hotspot이 {{count}}개 발견되었습니다.',
      hotspots_found_plural: 'Hotspot {{count}}개 발견',
      subtitle: 'Hotspot을 선택하여 계속하세요.',
    },
    confirm: {},
    diagnostics: {
      title: '진단 도구',
    },
    education: {
      cards: [
        {
          subtitle:
            'Hotspot은 하늘이 보이고 다른 Hotspot에서 최소한 300m 이상 떨어진 장소를 좋아합니다. ',
          title: '좋은 장소에 배치하세요',
        },
        {
          subtitle:
            'Hotspot을 침실용 탁자나 책장에 숨겨서는 안 됩니다. 그 대신 창가에 두세요.',
          title: '숨기지 마세요',
        },
        {
          subtitle:
            '주변 건물로 인해 주변 기기에 대한 Hotspot의 커버리지가 감소될 수 있습니다.',
          title: '건물이 신호를 차단할 수 있습니다',
        },
        {
          subtitle:
            'Hotspot을 금속망에서 멀리 떨어진 곳에 두세요. 금속망은 무선 신호를 상당 부분 차단할 수 있습니다.',
          title: '마지막으로 오류가 발생하지 않도록 주의하세요.',
        },
      ],
      title: 'Hotspot\n배치.',
    },
    enable_location: {
      cancel: '아니요, 나중에 설정하겠습니다',
      next: '권한 요청',
      p_1: '먼저 휴대전화의 위치에 액세스할 수 있는 권한을 요청받게 됩니다.',
      subtitle:
        'Hotspot의 위치를 설정해야 합니다. 휴대전화를 사용하여 이 작업을 수행할 수 있습니다.',
      title: 'Hotspot\n위치 설정',
    },
    external: {},
    firmware_update: {
      current_version: '현재 버전',
      explanation:
        'Hotspot은 자동으로 업데이트를 확인합니다. 이 작업은 약 10분 정도 걸릴 수 있습니다. 연결한 상태로 두고 나중에 다시 확인하세요.',
      next: '확인',
      required_version: '필수 버전',
      subtitle: '계속하려면 Hotspot의 펌웨어를 업데이트해야 합니다.',
      title: '업데이트 사용 가능',
    },
    location: {
      next: '위치 설정',
      title: 'Hotspot 위치',
    },
    location_fee: {
      balance: '잔액:',
      confirm_location: '선택한 위치가 올바른지 확인하고 Hotspot을 등록하세요.',
      elevation: '{{count}}m',
      elevation_label: '높이:',
      elevation_plural: '{{count}}m',
      fee: '수수료:',
      fee_next: '수수료 지불 및 Hotspot 등록',
      gain: '{{gain}}dBi',
      gain_label: 'TX / RX 증가:',
      next: 'Hotspot 등록',
      no_funds: '계정 잔액에 HNT가 부족합니다',
      subtitle_fee:
        '이 위치를 확인하려면 $10의 위치 수수료(DC)를 지불해야 합니다.',
      subtitle_free: '위치 수수료($10)가 선불 결제되었습니다.',
      title: '위치 수수료',
    },
    not_owner: {
      contact_manufacturer:
        'Hotspot 소유자라면(예: 구매한 경우) Hotspot 제조업체에 문의하세요.',
      subtitle_1_no_follow:
        'Wi-Fi를 업데이트하는 호스트인 경우, 지금 설정을 종료할 수 있습니다.',
      title: '이 Hotspot은 이미 소유자가 있습니다.',
    },
    onboarding_error: {
      disconnected: 'Hotspot 연결 중에 오류가 발생했습니다. 다시 시도하세요.',
      next: '설정 종료',
      title: '온보딩 오류',
    },
    owned_hotspot: {
      subtitle_1: '이 Hotspot은 이미 온보딩된 것으로 보입니다.',
      subtitle_2:
        'Hotspot의 Wi-Fi 또는 위치를 업데이트하려면 Hotspot의 설정으로 이동하세요.',
      title: '이 Hotspot을 이미 소유하고 있습니다',
    },
    pair: {
      alert_ble_off: {
        body:
          '페어링을 시작하려면 Bluetooth를 켜세요. 등록이 완료될 때까지 Bluetooth를 켜두세요.',
        title: 'Bluetooth 활성화',
      },
      alert_no_permissions: {
        body:
          'Helium이 Bluetooth를 사용하려면 권한이 필요합니다. 설정에서 Bluetooth 권한을 활성화할 수 있습니다.',
        title: 'Bluetooth 승인',
      },
      scan: '내 Hotspot 스캔',
      title: 'Bluetooth',
    },
    power: {
      next: '전원을 켰습니다',
      title: '전원 켜기',
    },
    progress: {
      next: '지갑으로 이동',
      subtitle: '몇 분 정도 걸릴 수 있으므로 이 화면을 닫아도 됩니다.',
      title: 'Hotspot 등록',
    },
    selection: {
      subtitle: '어떤 종류의 Hotspot을\n추가하시겠어요?',
      title: 'Hotspot\n선택.',
    },
    skip_location: {
      subtitle_1: '위치를 나중에 확인하기로 결정했습니다.',
      subtitle_2: '향후 설정에서 위치를 업데이트하세요.',
      title: 'Hotspot 추가',
    },
    wifi_password: {
      connecting: '네트워크에 연결',
      join_title: '암호 입력',
      placeholder: '암호',
      subtitle:
        '이 네트워크에 Hotspot을 연결하려면 Wi-Fi의 자격 증명을 입력하세요.',
    },
    wifi_scan: {
      available_networks: '사용 가능한 네트워크',
      disconnect: '네트워크 삭제',
      ethernet: '그 대신에 이더넷을 사용합니다',
      not_found_desc:
        'Hotspot이 부팅되고 사용 가능한 네트워크를 찾는 데 최대 3분이 소요될 수 있습니다.',
      not_found_title: 'Wi-Fi 네트워크를 찾을 수 없음',
      saved_networks: '구성된 네트워크',
      scan_fail_subtitle:
        'Hotspot 근처에 Wi-Fi 네트워크가 없습니다. 라우터가 온라인 상태이고 근처에 있는지 확인하세요.',
      scan_networks: '네트워크 스캔',
      settings_title: 'Wi-Fi 설정',
      subtitle: 'Hotspot을 연결하려는 Wi-Fi 네트워크를 선택합니다.',
      title: 'Wi-Fi',
    },
  },
  hotspots: {
    empty: {
      body: '아직 Hotspot을 추가하거나 팔로우하지 않았습니다.',
      hotspots: {},
    },
  },
  learn: {
    next: '가이드를 읽었음',
  },
  more: {
    sections: {
      app: {
        signOut: '로그아웃',
        signOutAlert: {
          body:
            '계정에서 로그 아웃합니다. 12개의 복구 단어를 가지고 계십니까? 그렇지 않으면 다음에 대한 액세스 권한을 잃게됩니다:\n\n - Hotspot\n - HNT\n - 지갑',
          title: '경고!',
        },
        title: '앱',
      },
      security: {
        authIntervals: {
          after_15_min: '15분 후',
          after_1_hr: '1시간 후',
          after_1_min: '1분 후',
          after_4_hr: '4시간 후',
          after_5_min: '5분 후',
          immediately: '즉시',
        },
        enablePin: 'PIN 활성화',
        requirePin: 'PIN 요청',
        resetPin: 'PIN 초기화',
        revealWords: '단어 공개',
        title: '보안',
      },
    },
    title: '설정',
  },
  ordinals: [
    '첫 번째',
    '두 번째',
    '세 번째',
    '네 번째',
    '다섯 번째',
    '여섯 번째',
    '일곱 번째',
    '여덟 번째',
    '아홉 번째',
    '열 번째',
    '열한 번째',
    '열두 번째',
  ],
  permissions: {
    location: {
      message:
        'Helium이 Bluetooth 검색을 위해 사용자의 위치에 액세스하고 위치 확인을 활성화해야 합니다. 이 정보는 절대 판매되거나 공유되지 않습니다.',
      title: '위치 권한',
    },
  },
  wallet: {
    copiedToClipboard: '{{address}}이(가) 클립 보드에 복사됨',
  },
}
