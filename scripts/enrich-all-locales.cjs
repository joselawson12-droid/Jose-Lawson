const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../locales');

// 30 Languages
const languages = [
  'en', 'fr', 'es', 'pt', 'de', 'it', 'nl', 'ar', 'zh', 'ja',
  'ko', 'ru', 'tr', 'hi', 'id', 'bn', 'th', 'pl', 'sv', 'uk',
  'vi', 'fil', 'ms', 'no', 'da', 'fi', 'cs', 'ro', 'el', 'hu'
];

// Testimonials data in all languages
const testimonialsTranslations = {
  en: {
    'testi-1': {
      role: 'Individual — Regular online shopper',
      title: 'Fast, accurate and prevents scams',
      comment: 'Instant verification in less than 2 seconds before finalizing a peer-to-peer transaction. It allowed me to immediately confirm the real balance of my Transcash top-up without bad surprises.',
      date: '3 days ago'
    },
    'testi-2': {
      role: 'Partner tobacconist — Lyon',
      title: 'Recommended to all our customers in store',
      comment: 'As a tobacconist, many customers ask us how to check if their voucher was properly activated at checkout. CARD CHECK is the clearest, most modern and secure solution we recommend.',
      date: '1 week ago'
    },
    'testi-3': {
      role: 'E-commerce manager — Bordeaux',
      title: 'The certificate of authenticity makes all the difference',
      comment: 'The interface is remarkably smooth on smartphones. Automatic code masking and official timestamped certificate issuance provide a genuine level of trust.',
      date: '2 weeks ago'
    },
    'testi-4': {
      role: 'Verified user — Paris 11th',
      title: 'Hassle-free and reassuring verification',
      comment: 'I received a Paysafecard voucher as a gift and wanted to ensure it was intact before using it. In 3 clicks, I confirmed the amount and validity.',
      date: '3 weeks ago'
    },
    'testi-5': {
      role: 'Freelancer & Tech Consultant — Marseille',
      title: 'Respect for privacy and SSL security',
      comment: 'What I especially appreciate is the strict adherence to privacy: no sensitive codes stored in plain text, hashed fingerprint, and end-to-end encrypted connection.',
      date: '1 month ago'
    },
    'testi-6': {
      role: 'Gaming & digital entertainment buyer',
      title: 'Essential for gift cards and top-ups',
      comment: 'Simple, direct and responsive. The eye toggle to hide/show code during entry is an excellent improvement to avoid errors while keeping secret codes safe from prying eyes.',
      date: '1 month ago'
    }
  },
  fr: {
    'testi-1': {
      role: 'Particulier — Acheteur régulier en ligne',
      title: 'Rapide, précis et évite les arnaques',
      comment: 'Vérification instantanée en moins de 2 secondes avant de valider une transaction entre particuliers. Cela m’a permis de confirmer immédiatement le solde réel de ma recharge Transcash sans mauvaise surprise.',
      date: 'Il y a 3 jours'
    },
    'testi-2': {
      role: 'Buraliste partenaire — Lyon',
      title: 'Recommandé à tous nos clients en point de vente',
      comment: 'En tant que buraliste, beaucoup de clients nous demandent comment vérifier si leur coupon a bien été activé en caisse. CARD CHECK est la solution la plus claire, moderne et sécurisée que nous recommandons.',
      date: 'Il y a 1 semaine'
    },
    'testi-3': {
      role: 'Gérant e-commerce — Bordeaux',
      title: 'Le certificat d’authenticité fait toute la différence',
      comment: 'L’interface est d’une fluidité remarquable sur smartphone. Le masquage automatique du code et la délivrance d’un certificat horodaté officiel apportent un vrai niveau de confiance.',
      date: 'Il y a 2 semaines'
    },
    'testi-4': {
      role: 'Utilisatrice certifiée — Paris 11e',
      title: 'Contrôle sans prise de tête et rassurant',
      comment: 'J’avais reçu un ticket Paysafecard en cadeau et je voulais m’assurer qu’il était intact avant utilisation. En 3 clics, j’ai obtenu la confirmation du montant et de la validité.',
      date: 'Il y a 3 semaines'
    },
    'testi-5': {
      role: 'Freelance & Consultant tech — Marseille',
      title: 'Respect de la confidentialité et sécurité SSL',
      comment: 'Ce que j’apprécie particulièrement, c’est le respect strict de la confidentialité : aucun code sensible n’est stocké en clair, l’empreinte est hachée et la connexion est chiffrée de bout en bout.',
      date: 'Il y a 1 mois'
    },
    'testi-6': {
      role: 'Acheteuse gaming & loisirs numériques',
      title: 'Indispensable pour les cartes cadeaux et recharges',
      comment: 'Simple, direct et réactif. L’œil pour masquer/démasquer le code pendant la saisie est une excellente amélioration pour ne pas se tromper tout en gardant son code secret à l’abri des regards.',
      date: 'Il y a 1 mois'
    }
  },
  es: {
    'testi-1': {
      role: 'Particular — Comprador online habitual',
      title: 'Rápido, preciso y evita estafas',
      comment: 'Verificación instantánea en menos de 2 segundos antes de validar una transacción entre particulares. Me permitió confirmar de inmediato el saldo real de mi recarga Transcash sin malas sorpresas.',
      date: 'Hace 3 días'
    },
    'testi-2': {
      role: 'Estanquero colaborador — Lyon',
      title: 'Recomendado a todos nuestros clientes en tienda',
      comment: 'Como estanquero, muchos clientes nos preguntan cómo comprobar si su cupón se activó bien en caja. CARD CHECK es la solución más clara, moderna y segura que recomendamos.',
      date: 'Hace 1 semana'
    },
    'testi-3': {
      role: 'Director e-commerce — Burdeos',
      title: 'El certificado de autenticidad marca la diferencia',
      comment: 'La interfaz es extraordinariamente fluida en smartphone. El enmascaramiento automático del código y la emisión de un certificado oficial sellado en el tiempo aportan una total confianza.',
      date: 'Hace 2 semanas'
    },
    'testi-4': {
      role: 'Usuaria certificada — París',
      title: 'Control sencillo y tranquilizador',
      comment: 'Recibí un cupón Paysafecard de regalo y quería asegurarme de que estaba intacto antes de usarlo. En 3 clics obtuve la confirmación del importe y la validez.',
      date: 'Hace 3 semanas'
    },
    'testi-5': {
      role: 'Freelance y Consultor tech — Marsella',
      title: 'Respeto de la privacidad y seguridad SSL',
      comment: 'Lo que más aprecio es el estricto respeto a la privacidad: ningún código sensible se almacena en texto plano, la huella está cifrada y la conexión cuenta con encriptación de extremo a extremo.',
      date: 'Hace 1 mes'
    },
    'testi-6': {
      role: 'Compradora gaming y ocio digital',
      title: 'Imprescindible para tarjetas regalo y recargas',
      comment: 'Sencillo, directo y reactivo. El icono del ojo para mostrar/ocultar el código durante la entrada es una excelente mejora para no equivocarse protegiendo el código secreto de miradas indiscretas.',
      date: 'Hace 1 mes'
    }
  },
  de: {
    'testi-1': {
      role: 'Privatperson — Regelmäßiger Online-Käufer',
      title: 'Schnell, präzise und schützt vor Betrug',
      comment: 'Sofortige Prüfung in unter 2 Sekunden vor Bestätigung einer Peer-to-Peer-Transaktion. So konnte ich das tatsächliche Guthaben meiner Transcash-Aufladung sofort ohne böse Überraschungen bestätigen.',
      date: 'Vor 3 Tagen'
    },
    'testi-2': {
      role: 'Partner-Tabakhändler — Lyon',
      title: 'Allen Kunden am Point of Sale empfohlen',
      comment: 'Als Tabakhändler fragen uns viele Kunden, wie sie überprüfen können, ob ihr Gutschein an der Kasse ordnungsgemäß aktiviert wurde. CARD CHECK ist die modernste und sicherste Lösung.',
      date: 'Vor 1 Woche'
    },
    'testi-3': {
      role: 'E-Commerce-Manager — Bordeaux',
      title: 'Das Echtheitszertifikat macht den Unterschied',
      comment: 'Die mobile Benutzeroberfläche ist bemerkenswert flüssig. Die automatische Codemaskierung und das offizielle zeitgestempelte Zertifikat schaffen echtes Vertrauen.',
      date: 'Vor 2 Wochen'
    },
    'testi-4': {
      role: 'Zertifizierte Nutzerin — Paris',
      title: 'Einfache und beruhigende Überprüfung',
      comment: 'Ich habe einen Paysafecard-Gutschein als Geschenk erhalten und wollte sichergehen, dass er vor der Einlösung intakt ist. Mit 3 Klicks hatte ich Gewissheit über Betrag und Gültigkeit.',
      date: 'Vor 3 Wochen'
    },
    'testi-5': {
      role: 'Freiberufler & IT-Berater — Marseille',
      title: 'Datenschutz und SSL-Sicherheit',
      comment: 'Besonders schätze ich die strikte Einhaltung der Privatsphäre: keine sensiblen Codes im Klartext gespeichert, kryptografische Hashes und lückenlose Verschlüsselung.',
      date: 'Vor 1 Monat'
    },
    'testi-6': {
      role: 'Gaming- und Digital-Käuferin',
      title: 'Unverzichtbar für Geschenkkarten und Aufladungen',
      comment: 'Einfach, direkt und reaktionsschnell. Die Augenfunktion zum Ein-/Ausblenden des Codes während der Eingabe ist perfekt, um Tippfehler zu vermeiden und Geheimcodes vor Blicken zu schützen.',
      date: 'Vor 1 Monat'
    }
  },
  pt: {
    'testi-1': {
      role: 'Particular — Comprador online habitual',
      title: 'Rápido, preciso e evita fraudes',
      comment: 'Verificação instantânea em menos de 2 segundos antes de validar uma transação entre particulares. Permitiu-me confirmar imediatamente o saldo real da minha recarga Transcash sem surpresas.',
      date: 'Há 3 dias'
    },
    'testi-2': {
      role: 'Tabacaria parceira — Lyon',
      title: 'Recomendado a todos os nossos clientes em loja',
      comment: 'Muitos clientes perguntam-nos como verificar se o cupão foi devidamente ativado na caixa. CARD CHECK é a solução mais clara, moderna e segura.',
      date: 'Há 1 semana'
    },
    'testi-3': {
      role: 'Gestor de e-commerce — Bordéus',
      title: 'O certificado de autenticidade faz toda a diferença',
      comment: 'A interface é notavelmente fluida no smartphone. A ocultação automática do código e a emissão de um certificado oficial com carimbo temporal proporcionam total confiança.',
      date: 'Há 2 semanas'
    },
    'testi-4': {
      role: 'Utilizadora certificada — Paris',
      title: 'Controlo simples e tranquilizador',
      comment: 'Recebi um cupão Paysafecard de presente e queria ter certeza de que estava intacto antes de o usar. Em 3 cliques obtive a confirmação do montante e validade.',
      date: 'Há 3 semanas'
    },
    'testi-5': {
      role: 'Freelancer e Consultor tech — Marselha',
      title: 'Respeito pela privacidade e segurança SSL',
      comment: 'O que mais aprecio é o rigoroso respeito pela privacidade: nenhum código sensível armazenado em texto legível, hash criptográfico e ligação encriptada de ponta a ponta.',
      date: 'Há 1 mês'
    },
    'testi-6': {
      role: 'Compradora de gaming e lazer digital',
      title: 'Indispensável para cartões oferta e recargas',
      comment: 'Simples, direto e reativo. O ícone de olho para ocultar/mostrar o código durante a introdução é excelente para evitar erros protegendo os códigos secretos.',
      date: 'Há 1 mês'
    }
  },
  it: {
    'testi-1': {
      role: 'Privato — Acquirente online regolare',
      title: 'Veloce, preciso ed evita truffe',
      comment: 'Verifica istantanea in meno di 2 secondi prima di convalidare una transazione tra privati. Mi ha permesso di confermare subito il saldo reale della mia ricarica Transcash senza sorprese.',
      date: '3 giorni fa'
    },
    'testi-2': {
      role: 'Tabaccaio partner — Lione',
      title: 'Raccomandato a tutti i clienti in negozio',
      comment: 'Come tabaccai, molti clienti ci chiedono come verificare se il voucher sia stato attivato correttamente in cassa. CARD CHECK è la soluzione più chiara e sicura che consigliamo.',
      date: '1 settimana fa'
    },
    'testi-3': {
      role: 'Responsabile e-commerce — Bordeaux',
      title: 'Il certificato di autenticità fa la differenza',
      comment: 'L’interfaccia è straordinariamente fluida su smartphone. L’oscuramento automatico del codice e il rilascio di un certificato ufficiale con timestamp offrono reale affidabilità.',
      date: '2 settimane fa'
    },
    'testi-4': {
      role: 'Utente certificata — Parigi',
      title: 'Controllo facile e rassicurante',
      comment: 'Ho ricevuto un voucher Paysafecard in regalo e volevo assicurarmi che fosse intatto prima dell’uso. In 3 clic ho confermato importo e validità.',
      date: '3 settimane fa'
    },
    'testi-5': {
      role: 'Freelance & Consulente IT — Marsiglia',
      title: 'Rispetto della privacy e sicurezza SSL',
      comment: 'Apprezzo in particolare il rispetto della privacy: nessun codice memorizzato in chiaro, impronte crittografiche e cifratura end-to-end.',
      date: '1 mese fa'
    },
    'testi-6': {
      role: 'Acquirente gaming & intrattenimento',
      title: 'Indispensabile per carte regalo e ricariche',
      comment: 'Semplice, diretto e reattivo. L’icona dell’occhio per mostrare/nascondere il codice protegge dai curiosi ed evita refusi durante la digitazione.',
      date: '1 mese fa'
    }
  },
  nl: {
    'testi-1': {
      role: 'Particulier — Regelmatige online koper',
      title: 'Snel, nauwkeurig en voorkomt oplichting',
      comment: 'Directe controle in minder dan 2 seconden voor het afronden van een P2P-transactie. Ik kon onmiddellijk het werkelijke saldo van mijn Transcash-opwaardering bevestigen zonder nare verrassingen.',
      date: '3 dagen geleden'
    },
    'testi-2': {
      role: 'Partner tabakswinkelier — Lyon',
      title: 'Aanbevolen aan al onze winkelklanten',
      comment: 'Veel klanten vragen ons hoe ze kunnen controleren of hun tegoedbon goed is geactiveerd bij de kassa. CARD CHECK is de duidelijkste en veiligste oplossing.',
      date: '1 week geleden'
    },
    'testi-3': {
      role: 'E-commerce manager — Bordeaux',
      title: 'Het echtheidscertificaat maakt het verschil',
      comment: 'De interface werkt vloeiend op smartphones. Automatische codemaskering en de afgifte van een officieel certificaat met tijdstempel geven echt vertrouwen.',
      date: '2 weken geleden'
    },
    'testi-4': {
      role: 'Geverifieerde gebruikster — Parijs',
      title: 'Zorgeloze en geruststellende controle',
      comment: 'Ik kreeg een Paysafecard-bon cadeau en wilde controleren of deze intact was voor gebruik. Binnen 3 klikken had ik bevestiging van saldo en geldigheid.',
      date: '3 weken geleden'
    },
    'testi-5': {
      role: 'Freelancer & IT-consultant — Marseille',
      title: 'Respect voor privacy en SSL-beveiliging',
      comment: 'Wat ik erg waardeer is het strikte privacybeleid: geen gevoelige codes opgeslagen in platte tekst, gehashte vingerafdrukken en volledige end-to-end versleuteling.',
      date: '1 maand geleden'
    },
    'testi-6': {
      role: 'Gaming & digitale entertainmentkoper',
      title: 'Onmisbaar voor cadeaukaarten en opwaarderingen',
      comment: 'Eenvoudig, direct en snel. De oogknop om de code te verbergen/tonen tijdens invoer voorkomt fouten terwijl de geheime code privé blijft.',
      date: '1 maand geleden'
    }
  },
  ar: {
    'testi-1': {
      role: 'أفراد — متسوق منتظم عبر الإنترنت',
      title: 'سريع ودقيق ويمنع عمليات الاحتيال',
      comment: 'تحقق فوري في أقل من ثانيتين قبل إتمام المعاملة بين الأفراد. سمح لي بتأكيد الرصيد الفعلي لشحنة Transcash على الفور دون أي مفاجآت سيئة.',
      date: 'منذ 3 أيام'
    },
    'testi-2': {
      role: 'بائع معتمد — ليون',
      title: 'موصى به لجميع عملائنا في نقاط البيع',
      comment: 'يسألنا العديد من العملاء كيف يمكنهم التأكد من تفعيل قسيمتهم بنجاح عند نقطة الدفع. CARD CHECK هو الحل الأكثر وضوحاً وأماناً.',
      date: 'منذ أسبوع'
    },
    'testi-3': {
      role: 'مدير تجارة إلكترونية — بوردو',
      title: 'شهادة الأصالة تصنع كل الفارق',
      comment: 'واجهة سلسة للغاية على الهواتف الذكية. إخفاء الرمز تلقائياً وإصدار شهادة رسمية مؤرخة يمنحان ثقة حقيقية.',
      date: 'منذ أسبوعين'
    },
    'testi-4': {
      role: 'مستخدمة معتمدة — باريس',
      title: 'فحص مريح وسهل وباعث على الاطمئنان',
      comment: 'تلقيت قسيمة Paysafecard كهدية وأردت التأكد من سلامتها قبل الاستخدام. في 3 نقرات حصلت على تأكيد القيمة والصلاحية.',
      date: 'منذ 3 أسابيع'
    },
    'testi-5': {
      role: 'مستشار تقني حر — مارسيليا',
      title: 'احترام الخصوصية وأمان SSL مشفر',
      comment: 'ما أقدره بشدة هو الالتزام الصارم بالسرية: لا يتم تخزين أي رموز حساسة بنص عادي، مع تشفير شامل وتام.',
      date: 'منذ شهر'
    },
    'testi-6': {
      role: 'مشترية ألعاب وترفيه رقمي',
      title: 'ضروري لبطاقات الهدايا والشحن',
      comment: 'بسيط ومباشر وسريع. زر العين لإظهار وإخفاء الرمز أثناء الكتابة ميزة ممتازة لتفادي الأخطاء وحماية الرمز السري.',
      date: 'منذ شهر'
    }
  },
  zh: {
    'testi-1': {
      role: '个人用户 — 经常在线购物',
      title: '快速、精准且有效防范诈骗',
      comment: '在进行个人间交易确认前不到2秒即可完成即时验证。让我能够立即核实Transcash充值的真实余额，杜绝意外损失。',
      date: '3天前'
    },
    'testi-2': {
      role: '合作烟草店主 — 里昂',
      title: '向店内所有顾客推荐',
      comment: '很多顾客向我们询问如何检查卡券是否在收银台正确激活。CARD CHECK是我们推荐的最清晰、现代和安全的解决方案。',
      date: '1周前'
    },
    'testi-3': {
      role: '电商主管 — 波尔多',
      title: '正品真实性证书让人倍感安心',
      comment: '手机端操作极为流畅。代码自动隐藏以及带有时间戳的官方证书签发，带来了真正的信任感。',
      date: '2周前'
    },
    'testi-4': {
      role: '认证用户 — 巴黎',
      title: '轻松省心、令人安心的验证体验',
      comment: '收到了一张Paysafecard礼品卡，想在使用前确保其完好有效。仅需点击3下便获得了金额与有效期的确认。',
      date: '3周前'
    },
    'testi-5': {
      role: '自由职业IT顾问 — 马赛',
      title: '严格隐私保护与SSL银行级安全',
      comment: '我最看重的是对隐私的严密保护：绝不以明文存储任何敏感卡密，哈希指纹保护并实施端到端加密传输。',
      date: '1个月前'
    },
    'testi-6': {
      role: '游戏与数字娱乐买家',
      title: '礼品卡与充值卡的必备神器',
      comment: '操作简单直接且响应迅速。输入时隐藏/显示卡密的眼睛按钮非常贴心，既避免输错又能防止他人窥探。',
      date: '1个月前'
    }
  },
  ja: {
    'testi-1': {
      role: '個人利用者 — オンライン決済の常連',
      title: '迅速・高精度で詐欺被害を防止',
      comment: '個人間取引を確定する前に2秒未満で瞬時に確認。Transcashチャージカードの実際の残高を想定外のトラブルなく即座に確認できました。',
      date: '3日前'
    },
    'testi-2': {
      role: '提携小売店オーナー — リヨン',
      title: '店頭のすべてのお客様に推奨しています',
      comment: 'レジでクーポンが正常に有効化されたか確認したいという相談をよく受けます。CARD CHECKは最も明確で安全な信頼のツールです。',
      date: '1週間前'
    },
    'testi-3': {
      role: 'ECサイト運営責任者 — ボルドー',
      title: '公式真正性証明書が大きな安心感を提供',
      comment: 'スマートフォンでの操作性が抜群です。コードの自動マスク表示とタイムスタンプ付き証明書の発行により高い信頼を得られます。',
      date: '2週間前'
    },
    'testi-4': {
      role: '認定ユーザー — パリ',
      title: '手間いらずで安心の確認プロセス',
      comment: 'ギフトとしてPaysafecardを受け取り、使用前に有効性を確認したかったのですが、わずか3クリックで金額と有効性を即時確認できました。',
      date: '3週間前'
    },
    'testi-5': {
      role: 'フリーランスITコンサルタント — マルセイユ',
      title: 'プライバシーの厳格保護とSSLセキュリティ',
      comment: '機密コードを平文で一切保存せず、暗号化ハッシュとエンドツーエンド通信で保護されている点を高く評価しています。',
      date: '1か月前'
    },
    'testi-6': {
      role: 'ゲーム・デジタルコンテンツ購入者',
      title: 'ギフトカードやプリペイドに欠かせない必須ツール',
      comment: '直感的で素早く反応します。入力中にコードをマスク/表示できるアイアイコンは、周囲の視線を防ぎつつ誤入力を防ぐのに役立ちます。',
      date: '1か月前'
    }
  },
  ko: {
    'testi-1': {
      role: '개인 사용자 — 정기 온라인 구매자',
      title: '빠르고 정확하며 사기 피해를 방지합니다',
      comment: '개인 간 거래 전 2초 이내의 즉각적인 검증. Transcash 충전 카드의 실제 잔액을 문제없이 즉시 확인할 수 있었습니다.',
      date: '3일 전'
    },
    'testi-2': {
      role: '제휴 매장 점주 — 리옹',
      title: '매장의 모든 고객에게 적극 추천합니다',
      comment: '계산대에서 바우처가 제대로 활성화되었는지 확인하려는 고객이 많습니다. CARD CHECK는 가장 명확하고 안전한 인증 수단입니다.',
      date: '1주 전'
    },
    'testi-3': {
      role: '이커머스 매니저 — 보르도',
      title: '공식 정품 인증서가 확실한 신뢰를 줍니다',
      comment: '스마트폰에서 매우 부드럽게 작동합니다. 자동 코드 마스킹과 타임스탬프가 찍힌 공식 인증서 발급으로 높은 신뢰도를 보장합니다.',
      date: '2주 전'
    },
    'testi-4': {
      role: '인증 사용자 — 파리',
      title: '간편하고 든든한 카드 검증',
      comment: 'Paysafecard 바우처를 선물 받아 사용 전 잔액을 확인하고 싶었습니다. 단 3번의 클릭만으로 금액과 유효성을 완벽히 확인했습니다.',
      date: '3주 전'
    },
    'testi-5': {
      role: '프리랜서 IT 컨설턴트 — 마르세유',
      title: '개인정보 보호 준수 및 강력한 SSL 보안',
      comment: '민감한 코드가 평문으로 저장되지 않고 해시 처리 및 종단 간 암호화가 철저히 적용되어 있어 매우 신뢰할 수 있습니다.',
      date: '1개월 전'
    },
    'testi-6': {
      role: '게임 및 디지털 콘텐츠 구매자',
      title: '기프트 카드와 충전권에 꼭 필요한 필수 앱',
      comment: '단순하고 직관적입니다. 코드 입력 시 숨김/표시를 전환할 수 있어 엿보기를 방지하면서 오타 없이 정확히 입력할 수 있습니다.',
      date: '1개월 전'
    }
  },
  ru: {
    'testi-1': {
      role: 'Частное лицо — Регулярный онлайн-покупатель',
      title: 'Быстро, точно и защищает от мошенников',
      comment: 'Мгновенная проверка менее чем за 2 секунды перед подтверждением сделки. Это позволило мне сразу подтвердить реальный баланс Transcash без неприятных сюрпризов.',
      date: '3 дня назад'
    },
    'testi-2': {
      role: 'Партнер-продавец — Лион',
      title: 'Рекомендуем всем клиентам в торговых точках',
      comment: 'Многие клиенты спрашивают, активирован ли их купон на кассе. CARD CHECK — самое понятное, современное и безопасное решение.',
      date: '1 неделю назад'
    },
    'testi-3': {
      role: 'Менеджер электронной коммерции — Бордо',
      title: 'Сертификат подлинности решает все',
      comment: 'Интерфейс работает безупречно на смартфонах. Автоматическое скрытие кода и выдача официального сертификата с отметкой времени вызывают полное доверие.',
      date: '2 недели назад'
    },
    'testi-4': {
      role: 'Сертифицированный пользователь — Париж',
      title: 'Простая и надежная проверка',
      comment: 'Получила купон Paysafecard в подарок и хотела убедиться в его сохранности перед использованием. В 3 клика подтвердила сумму и срок действия.',
      date: '3 недели назад'
    },
    'testi-5': {
      role: 'Фрилансер и IT-консультант — Марсель',
      title: 'Соблюдение конфиденциальности и SSL-защита',
      comment: 'Особенно ценю строгую защиту данных: коды не хранятся в открытом виде, используется криптографический хеш и сквозное шифрование.',
      date: '1 месяц назад'
    },
    'testi-6': {
      role: 'Покупатель цифровых товаров и игр',
      title: 'Незаменимо для подарочных карт и пополнений',
      comment: 'Просто, прямо и быстро. Переключатель скрытия/показа кода помогает не ошибиться при вводе и скрывает код от посторонних глаз.',
      date: '1 месяц назад'
    }
  },
  tr: {
    'testi-1': {
      role: 'Bireysel — Düzenli çevrimiçi alıcı',
      title: 'Hızlı, kesin ve dolandırıcılığı önler',
      comment: 'İki kişi arasındaki işlemi onaylamadan önce 2 saniyeden kısa sürede anında doğrulama. Transcash bakiyemi kötü sürprizler olmadan hemen doğrulamamı sağladı.',
      date: '3 gün önce'
    },
    'testi-2': {
      role: 'Yetkili bayi — Lyon',
      title: 'Satış noktamızdaki tüm müşterilere tavsiye ediyoruz',
      comment: 'Müşterilerimiz kuponlarının kasada doğru şekilde etkinleştirilip etkinleştirilmediğini sıkça soruyor. CARD CHECK önerdiğimiz en güvenli çözümdür.',
      date: '1 hafta önce'
    },
    'testi-3': {
      role: 'E-ticaret yöneticisi — Bordeaux',
      title: 'Orijinallik sertifikası tüm farkı yaratıyor',
      comment: 'Akıllı telefonlarda olağanüstü akıcı arayüz. Kodun otomatik maskelenmesi ve resmi zaman damgalı sertifika verilmesi tam bir güven sağlıyor.',
      date: '2 hafta önce'
    },
    'testi-4': {
      role: 'Onaylı kullanıcı — Paris',
      title: 'Zahmetsiz ve güven veren denetim',
      comment: 'Hediye olarak Paysafecard kuponu aldım ve kullanmadan önce sağlam olduğundan emin olmak istedim. 3 tıklamayla tutarı ve geçerliliği onayladım.',
      date: '3 hafta önce'
    },
    'testi-5': {
      role: 'Serbest Çalışan & BT Danışmanı — Marsilya',
      title: 'Gizlilik standartları ve SSL güvenliği',
      comment: 'Özellikle takdir ettiğim şey gizliliğe sıkı sıkıya bağlılık: hiçbir hassas kod açık metin olarak saklanmıyor, bağlantı uçtan uca şifreli.',
      date: '1 ay önce'
    },
    'testi-6': {
      role: 'Oyun ve dijital eğlence alıcısı',
      title: 'Hediye kartları ve yüklemeler için vazgeçilmez',
      comment: 'Basit, doğrudan ve hızlı. Giriş sırasında kodu gizleme/gösterme göz simgesi, hata yapmamak ve kodu meraklı gözlerden korumak için mükemmel.',
      date: '1 ay önce'
    }
  },
  hi: {
    'testi-1': {
      role: 'व्यक्तिगत — नियमित ऑनलाइन खरीदार',
      title: 'तेज़, सटीक और धोखाधड़ी से सुरक्षा',
      comment: 'लेन-देन की पुष्टि करने से पहले 2 सेकंड से भी कम समय में त्वरित सत्यापन। इसने मुझे बिना किसी आश्चर्य के अपने ट्रांसकैश कार्ड के वास्तविक बैलेंस की पुष्टि करने में मदद की।',
      date: '3 दिन पहले'
    },
    'testi-2': {
      role: 'साझेदार विक्रेता — ल्यों',
      title: 'दुकान में हमारे सभी ग्राहकों के लिए अनुशंसित',
      comment: 'कई ग्राहक पूछते हैं कि चेकआउट पर उनका वाउचर सही ढंग से सक्रिय हुआ या नहीं। CARD CHECK सबसे स्पष्ट और सुरक्षित समाधान है।',
      date: '1 सप्ताह पहले'
    },
    'testi-3': {
      role: 'ई-कॉमर्स प्रबंधक — बोर्डो',
      title: 'प्रामाणिकता प्रमाणपत्र सच्चा विश्वास दिलाता है',
      comment: 'स्मार्टफोन पर इंटरफ़ेस बेहद सहज है। स्वचालित कोड मास्किंग और आधिकारिक टाइमस्टैम्प प्रमाणपत्र वास्तविक विश्वास प्रदान करता है।',
      date: '2 सप्ताह पहले'
    },
    'testi-4': {
      role: 'सत्यापित उपयोगकर्ता — पेरिस',
      title: 'आसान और आश्वस्त करने वाला नियंत्रण',
      comment: 'मुझे उपहार के रूप में पेसेफकार्ड वाउचर मिला था और मैं उपयोग करने से पहले इसकी जांच करना चाहता था। 3 क्लिक में राशि की पुष्टि हो गई।',
      date: '3 सप्ताह पहले'
    },
    'testi-5': {
      role: 'फ्रीलांसर और तकनीकी सलाहकार — मार्सिले',
      title: 'गोपनीयता का सम्मान और एसएसएल सुरक्षा',
      comment: 'कोई भी संवेदनशील कोड सादे टेक्स्ट में संग्रहीत नहीं होता है, क्रिप्टोग्राफ़िक हैश और एंड-टू-एंड एन्क्रिप्शन सुनिश्चित है।',
      date: '1 महीने पहले'
    },
    'testi-6': {
      role: 'गेमिंग और डिजिटल मनोरंजन खरीदार',
      title: 'गिफ्ट कार्ड और रिचार्ज के लिए अनिवार्य',
      comment: 'सरल, सीधा और उत्तरदायी। इनपुट के दौरान कोड को छिपाने/दिखाने की सुविधा गलतियों से बचाती है और कोड को सुरक्षित रखती है।',
      date: '1 महीने पहले'
    }
  },
  id: {
    'testi-1': {
      role: 'Individu — Pembeli online reguler',
      title: 'Cepat, akurat, dan mencegah penipuan',
      comment: 'Verifikasi instan dalam waktu kurang dari 2 detik sebelum memvalidasi transaksi. Memungkinkan saya mengonfirmasi saldo riil isi ulang Transcash tanpa kejutan.',
      date: '3 hari yang lalu'
    },
    'testi-2': {
      role: 'Mitra toko — Lyon',
      title: 'Direkomendasikan untuk semua pelanggan kami',
      comment: 'Banyak pelanggan menanyakan cara memeriksa apakah voucher mereka telah diaktifkan dengan benar di kasir. CARD CHECK adalah solusi paling modern dan aman.',
      date: '1 minggu yang lalu'
    },
    'testi-3': {
      role: 'Manajer e-commerce — Bordeaux',
      title: 'Sertifikat keaslian membuat perbedaan nyata',
      comment: 'Antarmuka sangat mulus di ponsel cerdas. Penyamaran kode otomatis dan penerbitan sertifikat bertanda waktu resmi memberikan kepercayaan penuh.',
      date: '2 minggu yang lalu'
    },
    'testi-4': {
      role: 'Pengguna terverifikasi — Paris',
      title: 'Pemeriksaan bebas repot dan menenangkan',
      comment: 'Saya menerima voucher Paysafecard sebagai hadiah dan ingin memastikan voucher masih utuh sebelum digunakan. Hanya dalam 3 klik, saya mendapat konfirmasi.',
      date: '3 minggu yang lalu'
    },
    'testi-5': {
      role: 'Konsultan IT lepas — Marseille',
      title: 'Menghormati privasi dan keamanan SSL',
      comment: 'Yang sangat saya hargai adalah kepatuhan privasi yang ketat: tidak ada kode sensitif yang disimpan dalam teks biasa, serta enkripsi ujung-ke-ujung.',
      date: '1 bulan yang lalu'
    },
    'testi-6': {
      role: 'Pembeli game & hiburan digital',
      title: 'Sangat penting untuk kartu hadiah dan isi ulang',
      comment: 'Sederhana, langsung, dan responsif. Tombol mata untuk menyembunyikan/menampilkan kode saat mengetik mencegah kesalahan dan menjaga kerahasiaan.',
      date: '1 bulan yang lalu'
    }
  },
  pl: {
    'testi-1': {
      role: 'Osoba prywatna — Regularny nabywca online',
      title: 'Szybko, precyzyjnie i chroni przed oszustwami',
      comment: 'Błyskawiczna weryfikacja w mniej niż 2 sekundy przed sfinalizowaniem transakcji. Pozwoliło mi to natychmiast potwierdzić rzeczywiste saldo doładowania Transcash.',
      date: '3 dni temu'
    },
    'testi-2': {
      role: 'Partner handlowy — Lyon',
      title: 'Polecany wszystkim naszym klientom',
      comment: 'Wielu klientów pyta nas, jak sprawdzić, czy ich kupon został prawidłowo aktywowany przy kasie. CARD CHECK to najnowocześniejsze i najbezpieczniejsze rozwiązanie.',
      date: '1 tydzień temu'
    },
    'testi-3': {
      role: 'Kierownik e-commerce — Bordeaux',
      title: 'Certyfikat autentyczności robi wielką różnicę',
      comment: 'Interfejs działa płynnie na smartfonie. Automatyczne maskowanie kodu i oficjalny certyfikat ze znacznikiem czasu budzą pełne zaufanie.',
      date: '2 tygodnie temu'
    },
    'testi-4': {
      role: 'Certyfikowana użytkowniczka — Paryż',
      title: 'Bezproblemowa i uspokajająca kontrola',
      comment: 'Otrzymałam kupon Paysafecard w prezencie i chciałam upewnić się, że jest nienaruszony. W 3 kliknięciach potwierdziłam kwotę i ważność.',
      date: '3 tygodnie temu'
    },
    'testi-5': {
      role: 'Freelancer i konsultant IT — Marsylia',
      title: 'Prywatność i bezpieczeństwo SSL',
      comment: 'Szczególnie cenię rygorystyczną ochronę prywatności: brak przechowywania kodów jawnym tekstem, skróty kryptograficzne i pełne szyfrowanie.',
      date: '1 miesiąc temu'
    },
    'testi-6': {
      role: 'Kupująca gry i multimedia',
      title: 'Niezbędne do kart podarunkowych i doładowań',
      comment: 'Proste, bezpośrednie i szybkie. Ikona oka do ukrywania/pokazywania kodu chroni przed wzrokiem osób postronnych i zapobiega literówkom.',
      date: '1 miesiąc temu'
    }
  },
  sv: {
    'testi-1': {
      role: 'Privatperson — Regelbunden onlineköpare',
      title: 'Snabbt, exakt och förhindrar bedrägerier',
      comment: 'Omedelbar verifiering på under 2 sekunder före bekräftelse av transaktion. Det gjorde att jag direkt kunde verifiera det verkliga saldot på min Transcash-laddning.',
      date: '3 dagar sedan'
    },
    'testi-2': {
      role: 'Partnerbutik — Lyon',
      title: 'Rekommenderas till alla våra kunder i butiken',
      comment: 'Många kunder frågar oss hur de kontrollerar om deras värdekupong har aktiverats korrekt vid kassan. CARD CHECK är den säkraste lösningen.',
      date: '1 vecka sedan'
    },
    'testi-3': {
      role: 'E-handelsansvarig — Bordeaux',
      title: 'Äkthetsintyget gör hela skillnaden',
      comment: 'Gränssnittet är anmärkningsvärt smidigt på mobiltelefoner. Automatisk kodmaskering och officiellt certifikat med tidsstämpel ger genuint förtroende.',
      date: '2 veckor sedan'
    },
    'testi-4': {
      role: 'Verifierad användare — Paris',
      title: 'Enkel och trygg kontroll',
      comment: 'Jag fick en Paysafecard-kupong i gåva och ville säkerställa att den var intakt före användning. På 3 klick fick jag bekräftelse på belopp och giltighet.',
      date: '3 veckor sedan'
    },
    'testi-5': {
      role: 'Frilansare & IT-konsult — Marseille',
      title: 'Respekt för integritet och SSL-säkerhet',
      comment: 'Det jag uppskattar är den strikta integritetspolicyn: inga känsliga koder sparas i klartext och anslutningen är krypterad från ände till ände.',
      date: '1 månad sedan'
    },
    'testi-6': {
      role: 'Spel- och digitalköpare',
      title: 'Oumbärligt för presentkort och påfyllningar',
      comment: 'Enkelt, direkt och responsivt. Ögonikonen för att dölja/visa koden under inmatning förhindrar fel och skyddar hemliga koder.',
      date: '1 månad sedan'
    }
  },
  uk: {
    'testi-1': {
      role: 'Приватна особа — Регулярний покупець онлайн',
      title: 'Швидко, точно та захищає від шахрайства',
      comment: 'Миттєва перевірка менш ніж за 2 секунди перед підтвердженням транзакції. Це дозволило мені відразу дізнатися реальний баланс Transcash.',
      date: '3 дні тому'
    },
    'testi-2': {
      role: 'Партнер-продавець — Ліон',
      title: 'Рекомендуємо всім нашим клієнтам',
      comment: 'Багато клієнтів запитують, чи активовано купон на касі. CARD CHECK — найпрозоріше та найбезпечніше рішення.',
      date: '1 тиждень тому'
    },
    'testi-3': {
      role: 'Керівник інтернет-магазину — Бордо',
      title: 'Сертифікат автентичності має вирішальне значення',
      comment: 'Інтерфейс надзвичайно плавний на смартфонах. Автоматичне маскування коду та офіційний сертифікат із міткою часу забезпечують довіру.',
      date: '2 тижні тому'
    },
    'testi-4': {
      role: 'Сертифікована користувачка — Париж',
      title: 'Проста та надійна перевірка',
      comment: 'Отримала купон Paysafecard у подарунок і хотіла переконатися в його дійсності. За 3 кліки підтвердила суму та термін дії.',
      date: '3 тижні тому'
    },
    'testi-5': {
      role: 'Фрілансер та IT-консультант — Марсель',
      title: 'Повага до конфіденційності та безпека SSL',
      comment: 'Жодні конфіденційні коди не зберігаються у відкритому вигляді, а шифрування гарантує цілісність даних.',
      date: '1 місяць тому'
    },
    'testi-6': {
      role: 'Покупчиня ігор та цифрових товарів',
      title: 'Незамінно для подарункових карток та поповнень',
      comment: 'Зручно та швидко. Значок ока для приховування або показу коду допомагає уникнути помилок і захистити пін-код від сторонніх очей.',
      date: '1 місяць тому'
    }
  },
  vi: {
    'testi-1': {
      role: 'Cá nhân — Người mua sắm trực tuyến thường xuyên',
      title: 'Nhanh chóng, chính xác và ngăn ngừa lừa đảo',
      comment: 'Xác minh tức thì trong chưa đầy 2 giây trước khi xác nhận giao dịch. Cho phép tôi xác nhận ngay số dư thực tế của thẻ nạp Transcash mà không gặp bất ngờ.',
      date: '3 ngày trước'
    },
    'testi-2': {
      role: 'Đối tác bán lẻ — Lyon',
      title: 'Được đề xuất cho tất cả khách hàng tại quầy',
      comment: 'Nhiều khách hàng hỏi cách kiểm tra xem phiếu giảm giá đã được kích hoạt tại quầy hay chưa. CARD CHECK là giải pháp rõ ràng và an toàn nhất.',
      date: '1 tuần trước'
    },
    'testi-3': {
      role: 'Quản lý thương mại điện tử — Bordeaux',
      title: 'Chứng chỉ xác thực mang lại sự an tâm tuyệt đối',
      comment: 'Giao diện mượt mà trên điện thoại thông minh. Tự động ẩn mã và cấp chứng chỉ chính thức có đóng dấu thời gian tạo sự tin tưởng thực sự.',
      date: '2 tuần trước'
    },
    'testi-4': {
      role: 'Người dùng đã xác thực — Paris',
      title: 'Kiểm tra dễ dàng và an tâm',
      comment: 'Tôi nhận được phiếu Paysafecard làm quà và muốn đảm bảo phiếu còn nguyên vẹn trước khi dùng. Chỉ trong 3 lần nhấp, tôi đã xác nhận được số tiền.',
      date: '3 tuần trước'
    },
    'testi-5': {
      role: 'Tư vấn viên công nghệ tự do — Marseille',
      title: 'Tôn trọng quyền riêng tư và bảo mật SSL',
      comment: 'Điều tôi đánh giá cao là chính sách bảo mật nghiêm ngặt: không có mã nhạy cảm nào được lưu trữ ở dạng văn bản thuần túy và kết nối được mã hóa toàn diện.',
      date: '1 tháng trước'
    },
    'testi-6': {
      role: 'Người mua game và giải trí kỹ thuật số',
      title: 'Không thể thiếu cho thẻ quà tặng và nạp tiền',
      comment: 'Đơn giản, trực tiếp và nhanh chóng. Nút con mắt để ẩn/hiện mã khi nhập giúp tránh nhầm lẫn và bảo vệ mã bí mật khỏi những ánh nhìn tò mò.',
      date: '1 tháng trước'
    }
  }
};

// Activate My Card button translation for all 30 languages
const activateMyCardMap = {
  en: 'Activate My Card',
  fr: 'Activer ma carte',
  es: 'Activar mi tarjeta',
  pt: 'Ativar o meu cartão',
  de: 'Meine Karte aktivieren',
  it: 'Attiva la mia carta',
  nl: 'Activeer mijn kaart',
  ar: 'تفعيل بطاقتي',
  zh: '激活我的卡片',
  ja: 'カードを有効化する',
  ko: '내 카드 활성화하기',
  ru: 'Активировать мою карту',
  tr: 'Kartımı Etkinleştir',
  hi: 'मेरा कार्ड सक्रिय करें',
  id: 'Aktifkan Kartu Saya',
  bn: 'আমার কার্ড সক্রিয় করুন',
  th: 'เปิดใช้งานบัตรของฉัน',
  pl: 'Aktywuj moją kartę',
  sv: 'Aktivera mitt kort',
  uk: 'Активувати мою картку',
  vi: 'Kích hoạt thẻ của tôi',
  fil: 'I-activate ang Aking Card',
  ms: 'Aktifkan Kad Saya',
  no: 'Aktiver mitt kort',
  da: 'Aktiver mit kort',
  fi: 'Aktivoi korttini',
  cs: 'Aktivovat moji kartu',
  ro: 'Activează cardul meu',
  el: 'Ενεργοποίηση της κάρτας μου',
  hu: 'Kártyám aktiválása'
};

// Form element labels in all languages
const activationFormLabels = {
  en: {
    title: 'Activate My Card',
    subtitle: 'Certified bank authentication & secure registration',
    cardType: 'Card Type',
    amount: 'Amount',
    code1: 'Code 1',
    code2: 'Code 2',
    code3: 'Code 3',
    code4: 'Code 4',
    code5: 'Code 5',
    optional: 'optional',
    privacyPolicy: 'Privacy Policy',
    acceptPrivacy: 'I accept the',
    button: 'Activate My Card',
    processing: 'Processing activation...',
    successTitle: 'Your card has been activated!',
    successDesc: 'The voucher has been recorded and verified with the issuing protocol. A receipt has been saved.',
    activateAnother: 'Activate another card',
    errCardType: 'Please select a card type.',
    errAmountRequired: 'Please enter your card amount.',
    errAmountValid: 'Please enter a valid numeric amount.',
    errCode1Required: 'Please enter Code 1.',
    errCode1Length: 'Code 1 must contain at least 5 characters.',
    errPrivacyRequired: 'Please accept the Privacy Policy to continue.',
    errServer: 'Unable to reach the server. Please try again.'
  },
  fr: {
    title: 'Activer ma carte',
    subtitle: 'Authentification certifiée et enregistrement sécurisé',
    cardType: 'Type de carte',
    amount: 'Montant',
    code1: 'Code 1',
    code2: 'Code 2',
    code3: 'Code 3',
    code4: 'Code 4',
    code5: 'Code 5',
    optional: 'optionnel',
    privacyPolicy: 'Politique de confidentialité',
    acceptPrivacy: 'J’accepte la',
    button: 'Activer ma carte',
    processing: 'Traitement de l’activation...',
    successTitle: 'Votre carte a été activée !',
    successDesc: 'Le coupon a été consigné et vérifié auprès du protocole émetteur. Un justificatif a été enregistré.',
    activateAnother: 'Activer une autre carte',
    errCardType: 'Veuillez sélectionner un type de carte.',
    errAmountRequired: 'Veuillez renseigner le montant de votre carte.',
    errAmountValid: 'Veuillez indiquer un montant numérique valide.',
    errCode1Required: 'Veuillez renseigner le Code 1.',
    errCode1Length: 'Le Code 1 doit comporter au moins 5 caractères.',
    errPrivacyRequired: 'Veuillez accepter la Politique de confidentialité pour continuer.',
    errServer: 'Impossible de joindre le serveur. Veuillez réessayer.'
  },
  es: {
    title: 'Activar mi tarjeta',
    subtitle: 'Autenticación certificada y registro seguro',
    cardType: 'Tipo de tarjeta',
    amount: 'Monto',
    code1: 'Código 1',
    code2: 'Código 2',
    code3: 'Código 3',
    code4: 'Código 4',
    code5: 'Código 5',
    optional: 'opcional',
    privacyPolicy: 'Política de privacidad',
    acceptPrivacy: 'Acepto la',
    button: 'Activar mi tarjeta',
    processing: 'Procesando activación...',
    successTitle: '¡Su tarjeta ha sido activada!',
    successDesc: 'El cupón ha sido registrado y verificado con el protocolo emisor.',
    activateAnother: 'Activar otra tarjeta',
    errCardType: 'Por favor seleccione un tipo de tarjeta.',
    errAmountRequired: 'Por favor ingrese el monto de su tarjeta.',
    errAmountValid: 'Por favor ingrese un monto numérico válido.',
    errCode1Required: 'Por favor ingrese el Código 1.',
    errCode1Length: 'El Código 1 debe tener al menos 5 caracteres.',
    errPrivacyRequired: 'Por favor acepte la Política de privacidad para continuar.',
    errServer: 'No se puede conectar con el servidor. Inténtelo de nuevo.'
  },
  de: {
    title: 'Meine Karte aktivieren',
    subtitle: 'Zertifizierte Bankenauthentifizierung & sichere Registrierung',
    cardType: 'Kartentyp',
    amount: 'Betrag',
    code1: 'Code 1',
    code2: 'Code 2',
    code3: 'Code 3',
    code4: 'Code 4',
    code5: 'Code 5',
    optional: 'optional',
    privacyPolicy: 'Datenschutzerklärung',
    acceptPrivacy: 'Ich akzeptiere die',
    button: 'Meine Karte aktivieren',
    processing: 'Aktivierung wird verarbeitet...',
    successTitle: 'Ihre Karte wurde aktiviert!',
    successDesc: 'Der Gutschein wurde registriert und beim ausstellenden Protokoll verifiziert.',
    activateAnother: 'Eine weitere Karte aktivieren',
    errCardType: 'Bitte wählen Sie einen Kartentyp.',
    errAmountRequired: 'Bitte geben Sie den Betrag Ihrer Karte ein.',
    errAmountValid: 'Bitte geben Sie einen gültigen numerischen Betrag ein.',
    errCode1Required: 'Bitte geben Sie Code 1 ein.',
    errCode1Length: 'Code 1 muss mindestens 5 Zeichen enthalten.',
    errPrivacyRequired: 'Bitte akzeptieren Sie die Datenschutzerklärung, um fortzufahren.',
    errServer: 'Server nicht erreichbar. Bitte versuchen Sie es erneut.'
  },
  pt: {
    title: 'Ativar o meu cartão',
    subtitle: 'Autenticação bancária certificada e registo seguro',
    cardType: 'Tipo de cartão',
    amount: 'Montante',
    code1: 'Código 1',
    code2: 'Código 2',
    code3: 'Código 3',
    code4: 'Código 4',
    code5: 'Código 5',
    optional: 'opcional',
    privacyPolicy: 'Política de Privacidade',
    acceptPrivacy: 'Aceito a',
    button: 'Ativar o meu cartão',
    processing: 'A processar ativação...',
    successTitle: 'O seu cartão foi ativado!',
    successDesc: 'O cupão foi registado e verificado junto do protocolo emissor.',
    activateAnother: 'Ativar outro cartão',
    errCardType: 'Por favor selecione um tipo de cartão.',
    errAmountRequired: 'Por favor indique o montante do cartão.',
    errAmountValid: 'Por favor indique um montante numérico válido.',
    errCode1Required: 'Por favor insira o Código 1.',
    errCode1Length: 'O Código 1 deve conter pelo menos 5 caracteres.',
    errPrivacyRequired: 'Por favor aceite a Política de Privacidade para continuar.',
    errServer: 'Incapaz de contactar o servidor. Tente novamente.'
  },
  it: {
    title: 'Attiva la mia carta',
    subtitle: 'Autenticazione bancaria certificata e registrazione sicura',
    cardType: 'Tipo di carta',
    amount: 'Importo',
    code1: 'Codice 1',
    code2: 'Codice 2',
    code3: 'Codice 3',
    code4: 'Codice 4',
    code5: 'Codice 5',
    optional: 'opzionale',
    privacyPolicy: 'Informativa sulla privacy',
    acceptPrivacy: 'Accetto la',
    button: 'Attiva la mia carta',
    processing: 'Elaborazione attivazione in corso...',
    successTitle: 'La tua carta è stata attivata!',
    successDesc: 'Il voucher è stato registrato e verificato presso il protocollo emittente.',
    activateAnother: 'Attiva un\'altra carta',
    errCardType: 'Seleziona un tipo di carta.',
    errAmountRequired: 'Inserisci l\'importo della carta.',
    errAmountValid: 'Inserisci un importo numerico valido.',
    errCode1Required: 'Inserisci il Codice 1.',
    errCode1Length: 'Il Codice 1 deve contenere almeno 5 caratteri.',
    errPrivacyRequired: 'Accetta l\'Informativa sulla privacy per continuare.',
    errServer: 'Impossibile connettersi al server. Riprova.'
  },
  nl: {
    title: 'Activeer mijn kaart',
    subtitle: 'Gecertificeerde bankauthenticatie & veilige registratie',
    cardType: 'Kaarttype',
    amount: 'Bedrag',
    code1: 'Code 1',
    code2: 'Code 2',
    code3: 'Code 3',
    code4: 'Code 4',
    code5: 'Code 5',
    optional: 'optioneel',
    privacyPolicy: 'Privacybeleid',
    acceptPrivacy: 'Ik accepteer het',
    button: 'Activeer mijn kaart',
    processing: 'Activatie verwerken...',
    successTitle: 'Uw kaart is geactiveerd!',
    successDesc: 'De tegoedbon is geregistreerd en geverifieerd.',
    activateAnother: 'Nog een kaart activeren',
    errCardType: 'Selecteer een kaarttype.',
    errAmountRequired: 'Vul het bedrag van uw kaart in.',
    errAmountValid: 'Voer een geldig numeriek bedrag in.',
    errCode1Required: 'Vul Code 1 in.',
    errCode1Length: 'Code 1 moet minimaal 5 tekens bevatten.',
    errPrivacyRequired: 'Accepteer het Privacybeleid om door te gaan.',
    errServer: 'Kan de server niet bereiken. Probeer het opnieuw.'
  },
  ar: {
    title: 'تفعيل بطاقتي',
    subtitle: 'مصادقة بنكية معتمدة وتسجيل آمن',
    cardType: 'نوع البطاقة',
    amount: 'المبلغ',
    code1: 'الرمز 1',
    code2: 'الرمز 2',
    code3: 'الرمز 3',
    code4: 'الرمز 4',
    code5: 'الرمز 5',
    optional: 'اختياري',
    privacyPolicy: 'سياسة الخصوصية',
    acceptPrivacy: 'أوافق على',
    button: 'تفعيل بطاقتي',
    processing: 'جارٍ معالجة التفعيل...',
    successTitle: 'تم تفعيل بطاقتك بنجاح!',
    successDesc: 'تم تسجيل القسيمة والتحقق منها رسمياً.',
    activateAnother: 'تفعيل بطاقة أخرى',
    errCardType: 'يرجى اختيار نوع البطاقة.',
    errAmountRequired: 'يرجى إدخال مبلغ البطاقة.',
    errAmountValid: 'يرجى إدخال مبلغ رقمي صالح.',
    errCode1Required: 'يرجى إدخال الرمز 1.',
    errCode1Length: 'يجب أن يتكون الرمز 1 من 5 أحرف على الأقل.',
    errPrivacyRequired: 'يرجى قبول سياسة الخصوصية للمتابعة.',
    errServer: 'تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى.'
  },
  zh: {
    title: '激活我的卡片',
    subtitle: '认证银行鉴权与安全注册',
    cardType: '卡片类型',
    amount: '金额',
    code1: '代码 1',
    code2: '代码 2',
    code3: '代码 3',
    code4: '代码 4',
    code5: '代码 5',
    optional: '选填',
    privacyPolicy: '隐私政策',
    acceptPrivacy: '我接受',
    button: '激活我的卡片',
    processing: '正在处理激活...',
    successTitle: '您的卡片已激活！',
    successDesc: '卡券已在官方发行协议中成功备案与核验。',
    activateAnother: '激活另一张卡片',
    errCardType: '请选择卡片类型。',
    errAmountRequired: '请填写您的卡片金额。',
    errAmountValid: '请输入有效的数字金额。',
    errCode1Required: '请填写代码 1。',
    errCode1Length: '代码 1 至少需包含 5 个字符。',
    errPrivacyRequired: '请接受隐私政策以继续。',
    errServer: '无法连接到服务器，请重试。'
  },
  ja: {
    title: 'カードを有効化する',
    subtitle: '認定銀行認証および安全な登録',
    cardType: 'カードの種類',
    amount: '金額',
    code1: 'コード 1',
    code2: 'コード 2',
    code3: 'コード 3',
    code4: 'コード 4',
    code5: 'コード 5',
    optional: '任意',
    privacyPolicy: 'プライバシーポリシー',
    acceptPrivacy: '同意する：',
    button: 'カードを有効化する',
    processing: '有効化を処理中...',
    successTitle: 'カードが有効化されました！',
    successDesc: 'クーポンは発行元プロトコルにより記録および確認されました。',
    activateAnother: '別のカードを有効化する',
    errCardType: 'カードの種類を選択してください。',
    errAmountRequired: 'カードの金額を入力してください。',
    errAmountValid: '有効な数値を入力してください。',
    errCode1Required: 'コード 1 を入力してください。',
    errCode1Length: 'コード 1 は5文字以上である必要があります。',
    errPrivacyRequired: '続行するにはプライバシーポリシーに同意してください。',
    errServer: 'サーバーに接続できません。再試行してください。'
  },
  ko: {
    title: '내 카드 활성화하기',
    subtitle: '공인 은행 인증 및 보안 등록',
    cardType: '카드 종류',
    amount: '금액',
    code1: '코드 1',
    code2: '코드 2',
    code3: '코드 3',
    code4: '코드 4',
    code5: '코드 5',
    optional: '선택사항',
    privacyPolicy: '개인정보 처리방침',
    acceptPrivacy: '동의합니다:',
    button: '내 카드 활성화하기',
    processing: '활성화 처리 중...',
    successTitle: '카드가 활성화되었습니다!',
    successDesc: '바우처가 발급 프로토콜을 통해 등록 및 검증되었습니다.',
    activateAnother: '다른 카드 활성화하기',
    errCardType: '카드 종류를 선택해 주세요.',
    errAmountRequired: '카드 금액을 입력해 주세요.',
    errAmountValid: '유효한 숫자 금액을 입력해 주세요.',
    errCode1Required: '코드 1을 입력해 주세요.',
    errCode1Length: '코드 1은 5자 이상이어야 합니다.',
    errPrivacyRequired: '계속하려면 개인정보 처리방침에 동의해 주세요.',
    errServer: '서버에 연결할 수 없습니다. 다시 시도해 주세요.'
  },
  ru: {
    title: 'Активировать мою карту',
    subtitle: 'Сертифицированная банковская аутентификация и защита',
    cardType: 'Тип карты',
    amount: 'Сумма',
    code1: 'Код 1',
    code2: 'Код 2',
    code3: 'Код 3',
    code4: 'Код 4',
    code5: 'Код 5',
    optional: 'необязательно',
    privacyPolicy: 'Политика конфиденциальности',
    acceptPrivacy: 'Я принимаю',
    button: 'Активировать мою карту',
    processing: 'Обработка активации...',
    successTitle: 'Ваша карта активирована!',
    successDesc: 'Купон успешно зарегистрирован и проверен в протоколе эмитента.',
    activateAnother: 'Активировать другую карту',
    errCardType: 'Пожалуйста, выберите тип карты.',
    errAmountRequired: 'Укажите сумму вашей карты.',
    errAmountValid: 'Укажите корректную числовую сумму.',
    errCode1Required: 'Пожалуйста, укажите Код 1.',
    errCode1Length: 'Код 1 должен содержать не менее 5 символов.',
    errPrivacyRequired: 'Примите Политику конфиденциальности для продолжения.',
    errServer: 'Не удалось связаться с сервером. Попробуйте снова.'
  },
  tr: {
    title: 'Kartımı Etkinleştir',
    subtitle: 'Sertifikalı banka kimlik doğrulaması ve güvenli kayıt',
    cardType: 'Kart Türü',
    amount: 'Tutar',
    code1: 'Kod 1',
    code2: 'Kod 2',
    code3: 'Kod 3',
    code4: 'Kod 4',
    code5: 'Kod 5',
    optional: 'isteğe bağlı',
    privacyPolicy: 'Gizlilik Politikası',
    acceptPrivacy: 'Kabul ediyorum:',
    button: 'Kartımı Etkinleştir',
    processing: 'Etkinleştirme işleniyor...',
    successTitle: 'Kartınız etkinleştirildi!',
    successDesc: 'Kupon kaydedildi ve ihraççı protokolü ile doğrulandı.',
    activateAnother: 'Başka bir kart etkinleştir',
    errCardType: 'Lütfen bir kart türü seçin.',
    errAmountRequired: 'Lütfen kart tutarınızı girin.',
    errAmountValid: 'Lütfen geçerli bir sayısal tutar girin.',
    errCode1Required: 'Lütfen Kod 1\'i girin.',
    errCode1Length: 'Kod 1 en az 5 karakter içermelidir.',
    errPrivacyRequired: 'Devam etmek için lütfen Gizlilik Politikasını kabul edin.',
    errServer: 'Sunucuya ulaşılamıyor. Lütfen tekrar deneyin.'
  }
};

// Fallback for remaining languages for activationFormLabels:
languages.forEach(lang => {
  if (!activationFormLabels[lang]) {
    const actBtn = activateMyCardMap[lang] || 'Activate My Card';
    activationFormLabels[lang] = {
      title: actBtn,
      subtitle: activationFormLabels.en.subtitle,
      cardType: activationFormLabels.en.cardType,
      amount: activationFormLabels.en.amount,
      code1: 'Code 1',
      code2: 'Code 2',
      code3: 'Code 3',
      code4: 'Code 4',
      code5: 'Code 5',
      optional: activationFormLabels.en.optional,
      privacyPolicy: activationFormLabels.en.privacyPolicy,
      acceptPrivacy: activationFormLabels.en.acceptPrivacy,
      button: actBtn,
      processing: activationFormLabels.en.processing,
      successTitle: activationFormLabels.en.successTitle,
      successDesc: activationFormLabels.en.successDesc,
      activateAnother: activationFormLabels.en.activateAnother,
      errCardType: activationFormLabels.en.errCardType,
      errAmountRequired: activationFormLabels.en.errAmountRequired,
      errAmountValid: activationFormLabels.en.errAmountValid,
      errCode1Required: activationFormLabels.en.errCode1Required,
      errCode1Length: activationFormLabels.en.errCode1Length,
      errPrivacyRequired: activationFormLabels.en.errPrivacyRequired,
      errServer: activationFormLabels.en.errServer
    };
  }
});

// Read reference en.json and fr.json
const enPath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

languages.forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  // 1. Synchronize missing top-level sections from enData
  Object.keys(enData).forEach(key => {
    if (!data[key]) {
      data[key] = JSON.parse(JSON.stringify(enData[key]));
    }
  });

  // 2. Add/update common.activateMyCard
  if (!data.common) data.common = {};
  data.common.activateMyCard = activateMyCardMap[lang] || 'Activate My Card';

  // 3. Add/update hero.activateBtn
  if (!data.hero) data.hero = {};
  data.hero.activateBtn = activateMyCardMap[lang] || 'Activate My Card';
  data.hero.btnActivate = activateMyCardMap[lang] || 'Activate My Card';

  // 4. Update nav
  if (!data.nav) data.nav = {};
  data.nav.activateTicket = activateMyCardMap[lang] || 'Activate My Card';
  data.nav.activateMyCard = activateMyCardMap[lang] || 'Activate My Card';

  // 5. Update modal button
  if (!data.modal) data.modal = {};
  data.modal.btnActivate = activateMyCardMap[lang] || 'Activate My Card';
  data.modal.title = activateMyCardMap[lang] || 'Activate My Card';

  // 6. Update chatbot action button
  if (!data.chatbot) data.chatbot = {};
  data.chatbot.openActivationBtn = activateMyCardMap[lang] || 'Activate My Card';

  // 7. Add dedicated 'activation' section
  const formLabels = activationFormLabels[lang] || activationFormLabels.en;
  data.activation = {
    title: formLabels.title,
    subtitle: formLabels.subtitle,
    cardType: formLabels.cardType,
    amount: formLabels.amount,
    code1: formLabels.code1,
    code2: formLabels.code2,
    code3: formLabels.code3,
    code4: formLabels.code4,
    code5: formLabels.code5,
    optional: formLabels.optional,
    privacyPolicy: formLabels.privacyPolicy,
    acceptPrivacy: formLabels.acceptPrivacy,
    button: activateMyCardMap[lang] || formLabels.button,
    processing: formLabels.processing,
    successTitle: formLabels.successTitle,
    successDesc: formLabels.successDesc,
    activateAnother: formLabels.activateAnother,
    errCardType: formLabels.errCardType,
    errAmountRequired: formLabels.errAmountRequired,
    errAmountValid: formLabels.errAmountValid,
    errCode1Required: formLabels.errCode1Required,
    errCode1Length: formLabels.errCode1Length,
    errPrivacyRequired: formLabels.errPrivacyRequired,
    errServer: formLabels.errServer
  };

  // 8. Add translated testimonials items
  if (!data.testimonials) data.testimonials = {};
  const tItems = testimonialsTranslations[lang] || testimonialsTranslations.en;
  data.testimonials.items = tItems;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${lang}.json`);
});

console.log('Successfully enriched all 30 locale files!');
