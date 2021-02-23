const axios = require('axios');
const escapeHtml = require('escape-html');
const cors = require('cors')({ origin: true });
//  httpでリクエスト送るとidをembedAPIに渡して、返ってきたhtmlをリターンする
// httpでreqがくる→reqのidをembedAPIに渡す
// embedAPIの中でhtmlが返ってきたらresにつけて返す

// リクエストヘッダからID取得→embedAPIでHTMLを取得してリターンする
async function getEmbedHtml(v) {
  let result = '';
  const endpointURL = "https://publish.twitter.com/oembed?url=https://twitter.com/andypiper/statuses/";
  let params = {
    id: v
  }
  try {
    result = await axios.get(`${endpointURL}${params.id}`
    )
    return await result.data.html;
  } catch (err) {
    console.error(err);
  }
}

exports.tw_embedHTML = (req, res) => {
  cors(req, res, async () => {
    const embedHtml = await getEmbedHtml(req.query.id)
    await res.send(embedHtml);
  })
};
