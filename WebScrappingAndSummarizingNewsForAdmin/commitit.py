from GoogleNews import GoogleNews
import pandas as pd
import requests
from fake_useragent import UserAgent
import newspaper
from newspaper import fulltext
import re

keyword = 'flood'
googlenews = GoogleNews(lang='en', region='IND', period='1d', encode='utf-8')
googlenews.clear()
googlenews.search(keyword)
googlenews.get_page(2)
news_result = googlenews.result(sort=True)
news_data_df = pd.DataFrame.from_dict(news_result)

#can use .info and .head to get details from our dataframe about the generated data.

ua = UserAgent()
news_data_df_with_text = []
for index, headers in news_data_df.iterrows():
    news_title = str(headers['title'])
    news_media = str(headers['media'])
    news_update = str(headers['date'])
    news_timestamp = str(headers['datetime'])
    news_description = str(headers['desc'])
    news_link = str(headers['link'])
    print(news_link)
    news_img = str(headers['img'])
    try:
        # html = requests.get(news_link).text
        html = requests.get(news_link, headers={'User-Agent':ua.chrome}, timeout=5).text
        text = fulltext(html)
        print('Text Content Scraped')
    except:
        # print('Text Content Scraped Error, Skipped')
        pass
    news_data_df_with_text.append([news_title, news_media, news_update, news_timestamp, news_description, news_link, news_img, text])

news_data_with_text_df = pd.DataFrame(news_data_df_with_text, columns=['Title', 'Media', 'Update', 'Timestamp','Description', 'Link', 'Image', 'Text'])
# print(news_data_with_text_df.head())
news_data_with_text_df.to_csv("./data/news_data_with_text.csv")
news_data_with_text_df = pd.read_csv("./data/news_data_with_text.csv",  index_col=0)
news_data_with_text_df = news_data_with_text_df.head(10)
