import gensim
from gensim.models import FastText
import nltk
from nltk.tokenize import RegexpTokenizer
def clean_str(string, reg = RegexpTokenizer(r'[a-z]+')):
    # Clean a string with RegexpTokenizer
    string = string.lower()
    tokens = reg.tokenize(string)
    return tokens

#Harsh please increase this dataset as much as possible. The more words you will bring, the more accuracy you will get.
#The points must to remember are- All the words must be distinct, there must not be any word which comes in more than one category.
#For now, I am considering to store only these categories in my training_data- medical, food, shelter, water, supply
#Remember to maintain the similar indexing of categories as given in training_data.
training_data = [
    "medical medicine treatment health",
    "food nourishment groceries",
    "shelter housing lodging accommodation",
    "water hydration"
]

tokenized_training_data = [clean_str(text) for text in training_data]
fasttext_model = FastText(sentences=tokenized_training_data, vector_size=100, window=5, min_count=1, sg=1)

comments_cursor=[
    "I  water"
    # ,
    # "Looking for food supplies.",
    # "We require shelter for the night.",
    # "Please send medical supplies.",
    # "Any help would be appreciated."
]



for comments in comments_cursor:
    category = "other"
    answer=clean_str(comments)
    print("the comment string after cleaning is: ",answer)
    S=set()
    for str in answer:
        flag=0
        print("The current string word for analyses is:",str)
        similar_words = fasttext_model.wv.most_similar(str)
        print("Now I am printing all the similar words using fasttext mode:")
        for w,t in similar_words:
            print(w,t)
        
        for word,temp in similar_words:
            print("The current word in similar word is:",word)
            print("The similarity value for this word is:",temp)
            if temp>0.2:
                indexi = None
                for i, text in enumerate(training_data):
                    words = text.split()
                    if word in words:
                        indexi = i
                        # print("the index is:",indexi)
                        break  # Exit the loop once the index is found
                print("the updated indexi is:",indexi)
                if(indexi==0):
                    S.add("medical")
                elif(indexi==1):
                    S.add("food")
                elif(indexi==2):
                    S.add("shelter")
                elif(indexi==3):
                    S.add("water")
                print("The elements of set are")
                for el in S:
                    print(el)
                if(len(S)>1):
                    flag=1
                    break
        if flag==1:
            break
    print("the length of the set is:",len(S))
    if(len(S)==1):
        for ele in S:
            category=ele
            break
    print("The required category is: ",category)#Here we can write the code to store the database category column
