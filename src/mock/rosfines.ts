export const config = {
  design: {
    colors: {
      primary: '#00C752',
      secondary: '#448AFF',
      background: '#fff',
      'background-secondary': '#F2F4F6',
      text: '#2C2E2B',
      'text-secondary': '#787698',
      link: '#00C752',
      border: '#EFEFEF',
      success: '#52C41A',
      error: '#ED7171',
    },
    borders: {
      radius: 12,
    },
    layout: 'Landscape', // Portrait
    success_text: 'Платеж успешно завершен!', // Текст сообщения в случае успешной оплаты
  },
  profile: {
    name: 'РосШтрафы', //Публичное наименование компании
    logoUrl: '', //Логотип
    lconUrl: '', //Иконка с названием компании
    onlyLogo: false, //Вариант отображения: false = Логотип + название, true = только Иконка)
    contactInfo: '',
  },
  descriptor: {
    statement_descriptor: '', //имя компании, которое будет написано на выписки из банка или в детализации транзакций по карте.
  },

  URLs: {
    website: 'https://rosfines.ru/',
    website_show: false, //размещать на платежной форме?
    support: '', //URL раздела техподдержки
    support_show: false, //размещать на платежной форме?
    personalinfo: '', //URL на документ о защите персональных данных
    personalinfo_show: false, //размещать на платежной форме?
    oferta: '', //URL на оферты
    oferta_show: false, //размещать на платежной форме?
    docsReturns: '', //URL документа по возвратам
    docsReturns_show: false, //размещать на платежной форме?
    contactus: '', //блок информации с настройками от партнера
    contactus_show: false, //Показать блок от партнера вместо стандартного
  },
  confirmation: {
    offerta: true,
    docsReturns: false,
  },
  notification: {
    resultOnEmail: false, //Информировать ли пользователей об успешной\неуспешной оплате на email?
    returns: false, //Информировать ли пользователя о возврате?
  },
  payment: {
    details: 'sum', //Вариант отображения деталей платежа: sum (только сумма к переводу); sum_com(сумма комиссий, сумма к переводу); all_sums(сумма к оплате за услуги, сумма комиссий, сумма к переводу); all_sums_details (сумма к оплате за услуги, сумма комиссий, сумма к переводу + для каждой услуги и комиссии, наименование, стоимость, кол-во)
    methods: {
      internet: ['SberPay', 'MirPay', 'YP'],
      default: 'card',
      order: ['card', 'internet'],
      cardCollapse: false,
    },
    capture: 'warning', // all, none
  },
  clientInfo: {
    email: {
      enabled: true,
      required: false,
    },
    phone: {
      enabled: true,
      required: false,
    },
  },
};
