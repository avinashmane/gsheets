function scrapeData(url, selector) {
  let data
  try {
    const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText();
    const $ = Cheerio.load(res);
    const sel = selector.split(' ')
    let x_ = $(sel[0]).text()
    if (sel.length == 1) {
      data = $(sel[0]).toArray().map(x => $(x).text());
    } else if (sel.length == 2) {
      data = $(sel[0]).find(sel[1]).toArray().map(x => $(x).text());
    } else if (sel.length == 3)
      data = $(sel[0]).find(sel[1]).find(sel[2]).toArray().map(x => $(x).text());

    if (data.length)
      return data
    else
      return [[`No data: ${selector}`]]

  } catch (e) {
    return [[`Error: ${JSON.stringify(e)}`]]
  }
}


function test_yahoofin() {
  ticker = 'MSFT'
  const url = `https://finance.yahoo.com/quote/${ticker}/`;
  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText();
  const $ = Cheerio.load(res);
  console.log(res)
  const data = $.extract({
    title: 'div.titleInfo',
    table: 'table.snapshot2',
    links: {
      selector: 'a',
      value: 'href',
    },
  });
  return data
  // return scrapeData(url, 'section.card')
  // return scrapeData(url, 'div[data-testid="quote-statistics"] li span');
}

function getyahoofin(ticker) {
  const url = `https://finance.yahoo.com/quote/${ticker}/`;
  return scrapeData(url, 'span.titleInfo')
}

function getfinviz(ticker) {
  const url = `https://finviz.com/quote.ashx?t=${ticker}`;
  return scrapeData(url, 'table.snapshot2 td')
}
