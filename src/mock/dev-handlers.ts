import {rest} from 'msw';


export const configHandlers = [
  rest.get('/v1/processing/info/:orderId', (req, res, ctx) => {
    const transactionId = req.params.orderId;
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          transactionId,
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

const mockData3DS = (transactionId: string) => ({
  transactionId,
  result: 'THREE_DS',
  paReq: fakePaReq,
  transactionStatus: 'HOLD_3DS_WAITING',
});

const mockDataNo3DS = (transactionId: string) => ({
  paReq: null,
  result: 'SUCCESS',
  transactionId,
  transactionStatus: 'DEBITED',
});

export const paymentHandlers = [
  rest.post('/v1/processing/pay', (req, res, ctx) => {
    console.log(req.body);
    const {transactionId} = req?.body;
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: mockDataNo3DS(transactionId),
      }),
    );
  }),
  rest.get('/v1/processing/pay', (req, res, ctx) => {
    console.log(req.body);
    return res(
      ctx.status(200),
      ctx.json({
        code: 200,
        data: mockData3DS(req.body['transactionId']),
      }),
    );
  }),
];


