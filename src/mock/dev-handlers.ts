import {rest, DefaultRequestBody} from 'msw';
// @ts-ignore

type TLoginRequest = {
  jwt: string;
} & DefaultRequestBody;

export const configHandlers = [
  rest.get('/v1/processing/info/:orderId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          transactionId: '98fb1f7d-674a-4745-a3e4-53ef92e65565',
          description: 'test payment ',
          amount: 300.0,
          fee: 49.0,
          totalAmount: 349.0,
          prId: 4241,
          config: {
            homeUrl: 'https://rosfines.ru',
            logo: 'https://rosfines.ru/themes/custom/rosfines/favicon.ico',
            companyName: 'РосШтрафы',
          },
        },
      }),
    );
  }),
];

export const authHandlers = [
  // rest.post('/api/auth', (req, res, ctx) => {
  //   const {jwt} = req.body as TLoginRequest;
  //   if (jwt === '_expired') {
  //     return res(ctx.status(200), ctx.json({error: {message: 'JWT expired'}}));
  //   }
  //   if (jwt === '_error') {
  //     return res(ctx.status(504));
  //   }
  //   return res(ctx.status(200), ctx.json({data: {token: uuid4()}}));
  // }),
];
const mockPaReq = `<!DOCTYPE html>
<HTML>
<HEAD>
</HEAD>
<BODY ONLOAD="javascript:OnLoadEvent();">
<!--Start3ds-->
<FORM ACTION="https://test.3ds.payment.ru/way4acs/pa?id=YZzlloxdj1cxCtLHTnm74A.OC" METHOD="post" NAME="ThreeDform" target="_self">
<input name="PaReq" type="hidden" value="eJxVUl1zgjAQ/CsOr52aEETFOePgV7Wj1iodW186GDJKR4JAaLG/vgnFat9uNze7d3uBXhEda588zcJYdA2zjo0aFywOQrHvGi/e+L5t9Ch4h5Tz4ZqzPOUU5jzL/D2vhUHXWLornnTett/HY1wEHyYrBnI28UTUargGhfKZQmVAlX6dALpApZSygy8kBZ8l/emC2najZTuAKggRT6dDijG2HcdpOdhqtjEG9EuD8CNOvdHae5+PVoMJoJIAFudCpmfabFiALgDy9EgPUp46CEmeyTqLI0CaBHQdY5nrKlMiRRjQfnuXnDfTfr5I8kFRhNsNaWyar9bJHnUB6Q4IfMkpwcQ0TWLVTNKxnQ5WK5Y8+JF2p6aeuarhpC3cm4dbAlTCqTrAZfgLAl6cYsFVh9L+qyHgGSsDUIa6BHRdYDDRqTKpgnLXYpy4rfEubpLdMy7yp9njMOjfPXw9zHTWZZO2CFVQhGCr9NAAkJZB1RlRdXlV/fsRP5xCv2I=">
<input name="MD" type="hidden" value="373650-0CA4EFBE1A0DB0DE">
<input name="TermUrl" type="hidden" value="https://test.3ds.payment.ru/cgi-bin/cgi_link">
</FORM>
<SCRIPT>
function OnLoadEvent ()
{
  document.forms[0].submit();
}
</SCRIPT>
</BODY>
</HTML>`;

const fakePaReq = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3DS Hold</title>
</head>
<body>
  <form action="http://localhost:9999/.netlify/functions/threeD" method="post">
    <h3>Код - 1111</h3>
    <input type="text" >
    <button type="submit">Отправить код</button>
  </form>

</body>
</html>
`;


const mockData3DS = {
  transactionId: '98fb1f7d-674a-4745-a3e4-53ef92e65560',
  result: 'THREE_DS',
  paReq: fakePaReq,
  transactionStatus: 'HOLD_3DS_WAITING',
};

const mockDataNo3DS = {
  paReq: null,
  result: 'SUCCESS',
  transactionId: '98fb1f7d-674a-4745-a3e4-53ef92e65129',
  transactionStatus: 'DEBITED',
};

export const paymentHandlers = [
  rest.post('/v1/processing/pay', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: mockDataNo3DS
      }),
    );
  }),
];

// export const handlers = [
//   rest.post('/gateway/report/store-event', async (req, res, ctx) => {
//     return res(ctx.json({code: 'OK'}));
//   }),

//   rest.post('/gateway/auth-status', (req, res, ctx) => {
//     const {cookies} = req;
//     if (cookies['userData'] && cookies['SESSION']) {
//       return res(ctx.status(200), ctx.json({status: 'AUTH2_REQUIRED'}));
//     }
//     return res(ctx.status(200), ctx.json({status: 'OK'}));
//     // return res(ctx.status(500), ctx.json({code: 'ERROR'}));
//   }),
//   //ctx.cookie('userData', '', {maxAge: 0}),

//   rest.post('/gateway/initialize', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.cookie('SESSION', '__Session_cookie__'),
//       ctx.json({sessionStatus: 'AUTH1_REQUIRED', settings: {}}),
//     );
//   }),

//   rest.post('/gateway/auth1', (req, res, ctx) => {
//     const {body} = req;
//     const phone = body['phoneNumber'];
//     if (phone === '0000000000') {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           passwordLength: 4,
//           passwordLifetimeInSeconds: 60,
//           sessionStatus: 'AUTH1_REQUIRED',
//           verified: false,
//         }),
//       );
//     }
//     return res(
//       ctx.status(200),
//       ctx.cookie('userData', '__encrypted__user__data__'),
//       ctx.json({
//         passwordLength: 4,
//         passwordLifetimeInSeconds: 60,
//         sessionStatus: 'AUTH2_REQUIRED',
//         verified: true,
//       }),
//     );
//   }),

//   rest.post('/gateway/auth1-utm', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.cookie('userData', '__encrypted__user__data__'),
//       ctx.json({
//         passwordLength: 4,
//         passwordLifetimeInSeconds: 60,
//         phone: '79123456789',
//         sessionStatus: 'AUTH2_REQUIRED',
//         verified: true,
//       }),
//     );
//   }),
//   rest.post('/gateway/auth1-retry', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         passwordLength: 4,
//         passwordLifetimeInSeconds: 60,
//         sessionStatus: 'AUTH1_REQUIRED',
//         verified: true,
//       }),
//     );
//   }),

//   rest.post('/gateway/auth2-retry', (req, res, ctx) => {
//     if (req.body['verificationCode'] === '0000') {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           sessionStatus: 'AUTH2_REQUIRED',
//           verified: false,
//         }),
//       );
//     }
//     return res(
//       ctx.status(200),
//       ctx.json({
//         verified: true,
//         passwordLengtH: 4,
//         passwordLifetimeInSeconds: 60,
//         sessionStatus: 'OK',
//       }),
//     );
//   }),
//   rest.post('/gateway/auth2', (req, res, ctx) => {
//     if (req.body['verificationCode'] === '0000') {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           sessionStatus: 'AUTH2_REQUIRED',
//           verified: false,
//         }),
//       );
//     }
//     return res(
//       ctx.status(200),
//       ctx.cookie('userData', '_encripted_user_data_'),
//       ctx.json({
//         sessionStatus: 'OK',
//         verified: true,
//       }),
//     );
//   }),
//   rest.post('/gateway/send-sms', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         passwordLength: 4,
//         passwordLifetimeInSeconds: 60,
//       }),
//     );
//   }),

//   /** ANKETA HANDLERS */
//   rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(anketa));
//   }),

//   rest.post('/gateway/credit-application/agree-to-sign-documents', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),

//   rest.post('/gateway/credit-application/archive-app', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),

//   rest.post('/gateway/credit-application/get-calculator-params', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         minLoanAmount: 10000,
//         maxLoanAmount: 100000,
//         minLoanTermMonths: 12,
//         maxLoanTermMonths: 72,
//         approvedLoanAmount: 50000,
//         approvedLoanTermMonths: 24,
//         productCode: 'product_code',
//       }),
//     );
//   }),
//   rest.post('/gateway/credit-application/get-all-monthly-payment', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         monthlyPayment: 20000.34,
//         monthlySmsPayment: 100,
//         allSmsPayment: null,
//         monthlyJobLossProtectionPayment: null,
//         allJobLossProtectionPayment: null,
//         monthlyLifeAndHealthProtectionPayment: null,
//         allLifeAndHealthProtectionPayment: null,
//         monthlyCampaignPayment: null,
//         allCampaignPayment: 322.228,
//         rate: 19.9,
//       }),
//     );
//   }),

//   rest.post('/gateway/credit-application/get-employee-monthly-payment', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({monthlyPayment: 12345}));
//   }),
//   rest.post('/gateway/credit-application/get-monthly-payment-with-campaign', (req, res, ctx) => {
//     const amount = req.body['requestedLoanAmount'];
//     return res(
//       ctx.status(200),
//       ctx.json({
//         allCampaignPayment: 9900,
//         allJobLossProtectionPayment: 12743.36,
//         allLifeAndHealthProtectionPayment: 19115.04,
//         allSmsPayment: 2376,
//         monthlyCampaignPayment: 412.5,
//         monthlyJobLossProtectionPayment: 530.97,
//         monthlyLifeAndHealthProtectionPayment: 796.46,
//         monthlyPayment: 17498.19,
//         monthlySmsPayment: 99,
//         rate: amount >= 400_000 ? 13.9 : 19.9,
//       }),
//     );
//   }),
//   rest.post('/gateway/credit-application/get-monthly-payment', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         allCampaignPayment: 9900,
//         allJobLossProtectionPayment: 12743.36,
//         allLifeAndHealthProtectionPayment: 19115.04,
//         allSmsPayment: 2376,
//         monthlyCampaignPayment: 412.5,
//         monthlyJobLossProtectionPayment: 530.97,
//         monthlyLifeAndHealthProtectionPayment: 796.46,
//         monthlyPayment: 17498.19,
//         monthlySmsPayment: 99,
//       }),
//     );
//   }),

//   rest.post('/gateway/credit-application/send-documents', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/send-signature-code', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/sign-agreement', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         passwordLength: 4,
//         passwordLifetimeInSeconds: 60,
//         retryTimeInSeconds: 0,
//       }),
//     );
//   }),
//   rest.post('/gateway/credit-application/submit-form', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/update-session-app-account-transfer-details', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/update-session-app-card-transfer-details', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/update-session-app-outer-card-transfer-details', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post(
//     '/gateway/credit-application/update-session-app-confirm-upload-passport-photo',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json({code: 'OK'}));
//     },
//   ),
//   rest.post('/gateway/credit-application/update-session-app-details', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/update-session-app-loan-params', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/update-session-app-passport', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post(
//     '/gateway/credit-application/update-session-app-refuse-upload-passport-photo',
//     (req, res, ctx) => {
//       return res(ctx.status(200), ctx.json({code: 'OK'}));
//     },
//   ),
//   rest.post('/gateway/credit-application/update-session-app-registration-address', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/upload-passport-photo', (req, res, ctx) => {
//     // const photoType = req.url.searchParams.get('passportPhotoType');
//     // if (photoType === 'PRIMARY') {
//     //   return res(
//     //     ctx.status(409),
//     //     ctx.json({message: 'Something went wrong'})
//     //   )
//     // }
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/credit-application/verify-agreement-signature', (req, res, ctx) => {
//     if (req.body['verificationCode'] === '0000') {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           verified: false,
//         }),
//       );
//     }
//     return res(ctx.status(200), ctx.json({verified: true}));
//   }),
//   rest.post('/gateway/credit-application/verify-signature-code', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({code: 'OK'}));
//   }),
//   rest.post('/gateway/customer-profile/get-work-experience', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({workExperienceMonths: 20}));
//   }),
//   rest.post('/gateway/customer-profile/get-otp-cards', (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json({
//         customerOtpCards: [
//           {
//             bankCardId: '2-QF19DDU',
//             bankCardNumber: '1234567890123456',
//             cardExpirationDt: '2020-12-25',
//           },
//           {
//             bankCardId: '2-1QZXRWG',
//             bankCardNumber: '9876543200001234',
//             cardExpirationDt: '2023-10-02',
//           },
//         ],
//       }),
//     );
//   }),

//   rest.post('/gateway/dadata/suggestions/api/4_1/rs/suggest/bank', (req, res, ctx) => {
//     const query = req.body['query'];
//     if (query === '000000000') {
//       return res(
//         ctx.status(200),
//         ctx.json({
//           suggestions: [],
//         }),
//       );
//     }
//     return res(
//       ctx.status(200),
//       ctx.json({
//         suggestions: [
//           {
//             value: 'КЦ СЕВЕРО-ЗАПАДНОГО ГУ БАНКА РОССИИ',
//             data: {
//               bic: '044012000',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'СЕВЕРО-ЗАПАДНОЕ ГУ БАНКА РОССИИ',
//             data: {
//               bic: '044030001',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'АО "АЛЬФА-БАНК"',
//             data: {
//               bic: '044525593',
//               address: {data: {region_with_type: 'г Москва'}},
//             },
//           },
//           {
//             value: 'ООО НКО "МОБИЛЬНАЯ КАРТА"',
//             data: {
//               bic: '044030303',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'НКО АО ПРЦ',
//             data: {
//               bic: '044030505',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'СЕВЕРО-ЗАПАДНЫЙ БАНК ПАО СБЕРБАНК',
//             data: {
//               bic: '044030653',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'АО "СИТИ ИНВЕСТ БАНК"',
//             data: {
//               bic: '044030702',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'Ф. ОПЕРУ БАНКА ВТБ (ПАО) В САНКТ-ПЕТЕРБУРГЕ',
//             data: {
//               bic: '044030704',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'ПАО "БАЛТИНВЕСТБАНК"',
//             data: {
//               bic: '044030705',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//           {
//             value: 'ФИЛИАЛ ПАО "БАНК УРАЛСИБ" В Г.САНКТ-ПЕТЕРБУРГ',
//             data: {
//               bic: '044030706',
//               address: {data: {region_with_type: 'г Санкт-Петербург'}},
//             },
//           },
//         ],
//       }),
//     );
//   }),
// ];

// export const statusHandler = (status: AuthStatus = 'INITIALIZE') => {
//   return rest.post('/gateway/auth-status', (req, res, ctx) => {
//     return res.once(ctx.status(200), ctx.json({status}));
//   });
// };

// export const anketaHandler = (step: TAnketaStep) => {
//   const updatedAnketa = {...anketa, status: step};
//   return rest.post('/gateway/credit-application/get-session-app', (req, res, ctx) => {
//     return res.once(ctx.status(200), ctx.json(updatedAnketa));
//   });
// };
