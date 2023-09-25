def ans(ques):
    import pandas as pd

    df= pd.read_csv("daataset (1).csv", names=["Category","Description"],header=None)
    df.dropna(inplace=True)

    df.Category.unique()

    df['Category'] = '__label__' + df['Category'].astype(str)

    df['category_description'] = df['Category'] + ' ' + df['Description']

    import re

    # text = "  VIKI's | Bookcase/Bookshelf (3-Shelf/Shelve, White) | ? . hi"
    # text = re.sub(r'[^\w\s\']',' ', text)
    # text = re.sub(' +', ' ', text)
    # text.strip().lower()

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
    

    val=model.predict(ques)

    result_tuple = val[0]  
    label = result_tuple[0] 
    result_string = label.split('__label__')[1]


    return (result_string)


#water food shelter medical
#water related ->water

def actual(temp):
    ans=temp
    if temp== "fluid" or temp== "beverage":
        ans="water"
    elif temp=="refreshment" or temp== "nutrients":
        ans="food"
    elif temp=="drugs":
        ans="medical"
    return ans



from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db
import requests

app = Flask(__name__)

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://bytebrigade-2023-default-rtdb.firebaseio.com/'
})

@app.route('/Resource/<string:doc_id>', methods=['PUT'])
def update_data(doc_id):
    data = request.get_json()

    ref = db.reference('/Resource/'+doc_id)
    val=data["description"]
    cat=ans(val)  
    current_data =ref.get()
    if ref.get():
        current_data['cat'] =  cat
        ref.set(current_data)
        
        return jsonify({"message": "Data updated successfully"}),200
    else:
        return jsonify({"error": "Data not found"}),404

if __name__ == '__main__':
    app.run(host="0.0.0.0")
