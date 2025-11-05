export function generateManittoEmail({
  eventName,
  giverName,
  receiverName,
  eventDate,
  budget,
  profileUrl,
  comment,
}: {
  eventName: string;
  giverName: string;
  receiverName: string;
  eventDate: string;
  budget: number;
  profileUrl?: string;
  comment?: string;
}) {
  // if (!process.env.ASSET_BASE_URL) return `<html></html>`;

  const backgroundUrl1 = process.env.ASSET_BASE_URL + '/bg/email_bg_1.png';
  const backgroundUrl2 = process.env.ASSET_BASE_URL + '/bg/email_bg_2.png';
  const profileImgUrl = process.env.ASSET_BASE_URL + `/profile${profileUrl}`;
  const formattedComment = comment ? comment.replace(/\n/g, '<br>') : '';
  const buttonUrl = process.env.ASSET_BASE_URL;

  return `<!doctype html>
<html lang="ko" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<meta charset="utf-8" />
<meta content="width=device-width" name="viewport" />
<meta content="IE=edge" http-equiv="X-UA-Compatible" />
<meta name="x-apple-disable-message-reformatting" />
<meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
<title>마니또 안내</title>
<!--[if mso]>
            <style>
                * {
                    font-family: sans-serif !important;
                }
            </style>
        <![endif]-->
<!--[if !mso]><!-->
<!-- <![endif]-->
<style>
html {
    margin: 0 !important;
    padding: 0 !important;
}

* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}
td {
    vertical-align: top;
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}
a {
    text-decoration: none;
}
img {
    -ms-interpolation-mode:bicubic;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
        min-width: 320px !important;
    }
}
@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
        min-width: 375px !important;
    }
}
@media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
        min-width: 414px !important;
    }
}

</style>
<!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
<style>
@media only screen and (max-device-width: 599px), only screen and (max-width: 599px) {

    .eh {
        height:auto !important;
    }
    .desktop {
        display: none !important;
        height: 0 !important;
        margin: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
        padding: 0 !important;
        visibility: hidden !important;
        width: 0 !important;
        min-height: 0 !important;
    }
    .mobile {
        display: block !important;
        width: auto !important;
        height: auto !important;
        float: none !important;
    }
    .email-container {
        width: 100% !important;
        margin: auto !important;
    }
    .stack-column,
    .stack-column-center {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        direction: ltr !important;
    }
    .wid-auto {
        width:auto !important;
    }

    .table-w-full-mobile {
        width: 100%;
    }
    .full-button {
        width: 100% !important;
    }

    .mobile-center {
        text-align: center;
    }

    .mobile-center > table {
        display: inline-block;
        vertical-align: inherit;
    }

    .mobile-left {
        text-align: left;
    }

    .mobile-left > table {
        display: inline-block;
        vertical-align: inherit;
    }

    .mobile-right {
        text-align: right;
    }

    .mobile-right > table {
        display: inline-block;
        vertical-align: inherit;
    }

    .bg-section {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

}

</style>
</head>

<body width="100%" style="background-color:#fffded;margin:0;padding:0!important;mso-line-height-rule:exactly;">
<div style="background-color:#fffded">
<!--[if gte mso 9]>
                                            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                            <v:fill type="tile" color="#fffded"/>
                                            </v:background>
                                            <![endif]-->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td valign="top" align="center">
<table bgcolor="#fffded" style="margin:0 auto;" align="center" id="brick_container" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container">
<tr>
<td width="600">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td width="600" align="center" style="background-color:#fffded;   padding-left:24px; padding-right:24px;" bgcolor="#fffded">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
<div style="line-height:24px; height:24px; font-size:24px">&#8202;</div>
</td>
</tr>
<tr>
<td align="center">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td width="540" height="657" align="center" class="RX4HW1O4b4vTXLUPcaEXIZzsIjGaZr invert-bg bg-section" style="vertical-align: middle; background-repeat:no-repeat !important; background-position: center center !important; background-size: contain !important; border-collapse:separate !important; " background="${backgroundUrl1}">
<!--[if gte mso 9]>
                <v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: 540px; height:657px;"
                src="${backgroundUrl1}"
                />
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block;position: absolute; width: 540px; height:657px; ">
                <v:fill opacity="0%" color="#000" />
                <v:textbox inset="0,0,0,0">
                <![endif]-->
<div>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
<div style="line-height:235px; height:235px; font-size:235px">&#8202;</div>
</td>
</tr>
<tr>
<td align="center">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td style="vertical-align: middle;" width="300">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td width="300" align="center" style="vertical-align: middle;  ">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td style="vertical-align: middle;" align="center">
<div style="color:#101828;font-family:LINE Seed Sans KR,Arial,sans-serif;line-height:140%;text-align:center;max-width:250px; margin:auto; font-size:12px; word-break:keep-all;">
${eventDate}에 주최되는 
<strong>${eventName}</strong>에 초대된 <strong>${giverName}님 </strong>안녕하세요! 💌
</div>
</td>
</tr>
<tr>
<td>
<div style="line-height:22px; height:22px; font-size:22px">&#8202;</div>
</td>
</tr>
    ${
      profileImgUrl
        ? `<tr>
<td align="center">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td style="vertical-align: middle;" width="86" align="center"><img src="${profileImgUrl}" width="86" border="0" style="min-width:86px; width:86px;
         height: auto; display: block;"></td>
</tr>
</table>
</td>
</tr>`
        : ''
    }


<tr>
<td>
<div style="line-height:16px; height:16px; font-size:16px">&#8202;</div>
</td>
</tr>
<tr>
<td style="vertical-align: middle;" align="center">
<div style="color:#101828;font-family:LINE Seed Sans KR,Arial,sans-serif;line-height:140%;text-align:center; margin:auto; font-size:13px;">
🎁 당신의 마니또는 <strong>${receiverName}</strong> 🎁 <br><br>
    <span style="font-size:12px;color:#101828; ">
    ${budget ? `선물 예산은 <strong>${budget.toLocaleString()}원</strong>입니다.<br/>` : ''}
              ※ 마음을 담아 작은 선물을 준비해주세요.<br/>
              이벤트 당일, 서로의 선물과 마음을 나누며<br/>
              즐거운 시간을 보내시길 바랍니다. 😊  
              </span>
</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<div style="line-height:205px; height:205px; font-size:205px">&#8202;</div>
</td>
</tr>
</table>
</div>
<!--[if gte mso 9]>
                </v:textbox>
                </v:fill>
                </v:rect>
                </v:image>
                <![endif]-->
</td>
</tr>
</table>
</td>
</tr>
 <!-- comment 영역: 존재할 경우만 추가 -->
     ${
       comment
         ? `
<tr>
<td align="center">
<table cellspacing="0" cellpadding="0" border="0">
<tr>

<td width="540" height="580" align="center" class="zh5DFpwkGI5XSa4Weue9wiJURa7DHF invert-bg bg-section" style="vertical-align: middle; height:580px; background-repeat:no-repeat !important; background-position: center center !important; background-size: contain !important; border-collapse:separate !important; " background="${backgroundUrl2}">
<!--[if gte mso 9]>
                <v:image xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block; width: 540px; height:580px;"
                src="${backgroundUrl2}"
                />
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style=" border: 0;display: inline-block;position: absolute; width: 540px; height:580px;">
                <v:fill opacity="0%" color="#000" />
                <v:textbox inset="0,0,0,0">
                <![endif]-->
<div>
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td>
<div style="line-height:205px; height:205px; font-size:205px">&#8202;</div>
</td>
</tr>
<tr>
<td align="center">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td style="vertical-align: middle;" width="300">
<table cellspacing="0" cellpadding="0" border="0">
<tr>
<td width="300" align="center" style="vertical-align: middle;  ">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
<tr>
<td style="vertical-align: middle;" align="center">
<div style="line-height:24px;text-align:center;"><span style="color:#101828;font-weight:700;font-family:LINE Seed Sans KR,Arial,sans-serif;font-size:12px;line-height:24px;text-align:center;"><br>주최자가 보내는 메세지</span></div>
</td>
</tr>
<tr>
<td>
<div style="line-height:24px; height:24px; font-size:24px">&#8202;</div>
</td>
</tr>
<tr>
<td style="vertical-align: middle;" align="center">
<div style="text-align:center; max-width:300px; margin:auto; white-space:normal; word-break:keep-all; overflow-wrap:break-word; font-size:11px; color:#101828;">${formattedComment}</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
`
         : ''
     }
<tr>
<td>
<div style="line-height:205px; height:205px; font-size:205px">&#8202;</div>
</td>
</tr>

</table>
</div>
<!--[if gte mso 9]>
                </v:textbox>
                </v:fill>
                </v:rect>
                </v:image>
                <![endif]-->
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td align="center">
<!-- ✅ 버튼 영역 -->
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="margin:auto; margin-top:20px; text-align:center;">
            <tr>
              <td align="center">
               <center>
                <!-- Outlook용 버튼 -->
                <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${buttonUrl}" style="height:40px;v-text-anchor:middle; width:240px;" arcsize="50%"  fillcolor="#FFDF6D">
                    <w:anchorlock/>
                    <center style="font-family:'LineSeed',sans-serif;font-size:13px;font-weight:bold;">
                      마니또리 바로가기
                    </center>
                  </v:roundrect>
                <![endif]-->
                <!-- 일반 클라이언트용 버튼 -->
                <a href="${buttonUrl}"
                style="background-color:#FFDF6D; border-radius:8px; display:inline-block; font-family:'LineSeed',sans-serif; font-size:13px; font-weight:bold; line-height:40px; text-align:center; text-decoration:none; width:240px; -webkit-text-size-adjust:none; mso-hide:all;">
                <font color="#000">
                마니또리 바로가기
                </font>
                </a>
                </center>
              </td>
            </tr>
        </td>
      </tr>
      <!-- footer -->
        <tr>
          <td align="center" style="padding: 30px 0 10px; font-size:11px; color:#999999; text-align:center; 
            font-family:'LineSeed','Apple SD Gothic Neo','Spoqa Han Sans','Noto Sans KR',Arial,sans-serif;">
            © 2025 MANITTO-RRI. All rights reserved.
          </td>
      </tr>
    </table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</div>
</body>

</html>`;
}
