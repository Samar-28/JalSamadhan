import pymongo
import nltk
from nltk.tokenize import word_tokenize
from nltk.tokenize import RegexpTokenizer
def clean_str(string, reg = RegexpTokenizer(r'[a-z]+')):
    # Clean a string with RegexpTokenizer
    string = string.lower()
    tokens = reg.tokenize(string)
    return tokens

comments_cursor=[
    "I need clean water urgently.",
    "Looking for food supplies.",
    "We require shelter for the night.",
    "Please send medical supplies.",
    "Any help would be appreciated."
]
for comments in comments_cursor:
    category = "other"
    answer=clean_str(comments)
    print(answer)
    L=[]
    for str in answer:
        if str=="medical" and (len(L)==0 or L[0]!="medical"):
            L.append("medical")
            if(len(L)>1):
                break
        elif str=="food" and  (len(L)==0 or L[0]!="food"):
            L.append("food")
            if(len(L)>1):
                break
        elif str=="shelter" and (len(L)==0 or L[0]!="shelter"):
            L.append("shelter")
            if(len(L)>1):
                break
        elif str=="water" and (len(L)==0 or L[0]!="water"):
            L.append("water")
            if(len(L)>1):
                break
        elif str=="supply" and (len(L)==0 or L[0]!="supply"):
            L.append("supply")
            if(len(L)>1):
                break
    if(len(L)==1):
        category=L[0]
    print("The required category is: ",category)#Here we can write the code to store the database category column
    # collection.update_one({'_id': comment['_id']}, {'$set': {'categ': category}})#considered that the column name is categ.