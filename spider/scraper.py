__author__ = 'cam'

import urllib2, BeautifulSoup, pprint, csv, os

tableHeaders =  ["case_no","time_reported","time_occurred","location","description","status", "date"]

def getURLs(src="http://police.duke.edu/news_stats/summaries/index.php"):
    content = urllib2.urlopen(src).read()
    bs_dom  = BeautifulSoup.BeautifulSoup(content)
    all_links = bs_dom.findAll("a")
    valid_links = []
    for url in all_links:
        href = url._getAttrMap()["href"]
        if "weekly" in href:
            valid_links.append("http://police.duke.edu/news_stats/summaries/" + href)
    return valid_links

def extractDataFromTableRow(row_items):
    data = []
    for column in row_items:
        is_font = column.find("font")
        is_p    = column.find("p")
        value = (is_font or is_p).text
        value = value.replace("\r","").replace("\n","").replace("\t"," ").replace("  ","").encode("utf-8")

        data.append(value)
    return data

def extractTableFromWebpage(html):
    tabularData = []
    tableHTML = BeautifulSoup.BeautifulSoup(html)

    tableElement = tableHTML.find('table')
    rows = tableElement.findAll('tr')[2:] # skip header rows

    date = rows[0].find("td").find("b").text.replace("\n","").replace("\t"," ").replace("\r","").replace("  "," ")

    for row in rows[1:]:
        tds = row.findAll("td")
        if len(tds) == 1: # date row
            if row.find("td").find("b") != None:
                date = row.find("td").find("b").text.replace("\n","").replace("\t"," ").replace("\r","").replace("  "," ")
        else:
            row_data = extractDataFromTableRow(tds)
            row_data.append(date)
            tabularData.append(dict(zip(tableHeaders, row_data)))

    return tabularData

def scrapeData(useCache):
    all_data = []
    if useCache & os.path.isfile("out.csv"):
        reader = csv.reader(open("out.csv","r"))
        headers = reader.next()
        for row in reader:
            d = dict(zip(headers, row))
            all_data.append(d)
    else:
        stat_urls = getURLs()
        for url in stat_urls:
                url_html = urllib2.urlopen(url).read()
                table_data = extractTableFromWebpage(url_html)
                all_data.extend(table_data)
        if useCache:
            onlyRows = []
            for s in all_data:
                onlyRows.append(s.values())
            onlyRows.insert(0, s.keys())
            outfile = open("./out.csv", 'wb')
            wr = csv.writer(outfile, quoting=csv.QUOTE_ALL)
            for row in onlyRows:
                wr.writerow(row)

    return all_data