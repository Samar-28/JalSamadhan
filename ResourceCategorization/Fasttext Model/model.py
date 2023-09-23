import pandas as pd

df= pd.read_csv("/Users/harshkumawat/Desktop/MLClassification/dataset (2).csv", names=["Category","Description"],header=None)
print(df.shape)
df.head(3)

df.dropna(inplace=True)

df.Category.unique()

df['Category'] = '__label__' + df['Category'].astype(str)

df['category_description'] = df['Category'] + ' ' + df['Description']

import re

text = "  VIKI's | Bookcase/Bookshelf (3-Shelf/Shelve, White) | ? . hi"
text = re.sub(r'[^\w\s\']',' ', text)
text = re.sub(' +', ' ', text)
text.strip().lower()

def preprocess(text):
    text = re.sub(r'[^\w\s\']',' ', text)
    text = re.sub(' +', ' ', text)
    return text.strip().lower() 

df['category_description'] = df['category_description'].map(preprocess)

from sklearn.model_selection import train_test_split

train, test = train_test_split(df, test_size=0.2)

train.to_csv("sihtrain.train", columns=["category_description"], index=False, header=False)
test.to_csv("sihtest.test", columns=["category_description"], index=False, header=False)

import fasttext

model = fasttext.train_supervised(input="sihtrain.train")
model.test("sihtest.test")

print(model.predict("wintech needs some water"))
print(model.predict("I am very hungry. Need some eatable"))
print(model.predict("I am very hungry. Need some water"))
print(model.predict("I am having fever. Need some medicine"))