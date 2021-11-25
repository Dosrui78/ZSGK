import requests
import json
import xlrd
import execjs
import time
import random
from pprint import pprint
from fake_useragent import UserAgent
from urllib.parse import urlencode, unquote
from read_excel import *
from multiprocessing import Pool


count = 0
class School:
    def __init__(self):
        self.BASE_URL = 'https://api.eol.cn/gkcx/api/'
        self.codes = get_school_id()
        self.proIds = get_province_id()
        # self.payloadData = self.getPayloadData()
        self.payloadHeader = self.getHeaders()


    def getHeaders(self) -> dict:
        '''构造请求头'''
        # ua = UserAgent(use_cache_server=False)
        payloadHeader = {
            'Host': 'api.eol.cn',
            'Origin': 'https://gkcx.eol.cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
        }
        return payloadHeader

    def getPayloadData(self, *args) -> dict:
        '''构造请求参数data'''
        payloadData = {
            'e_sort': 'zslx_rank,min',
            'e_sorttype': 'desc,desc',
            'local_province_id': args[0][1],
            'local_type_id': '',
            'page': args[0][2],
            'school_id': args[0][0],
            'size': '10',
            'uri': 'apidata/api/gk/score/province',
            'year': '2021',
        }
        return payloadData



    def getSign(self, data) -> str:
        '''获取加密的signsafe参数'''
        p = 'api.eol.cn/gkcx/api/?' + unquote(urlencode(data))
        # p = 'api.eol.cn/gkcx/api/?e_sort=zslx_rank,min&e_sorttype=desc,desc&local_province_id=44&local_type_id=2074&page=1&school_id=286&size=10&uri=apidata/api/gk/score/province&year=2021&'
        with open('get_signsafe.js', encoding='utf-8') as f:
            js_text_1 = f.read()
            sign = execjs.compile(js_text_1).call("A", p)
        return sign

    def scrape(self, data) -> dict:
        '''请求获取加密的text并解密'''
        try:
            res = requests.post(self.BASE_URL, data=json.dumps(data), headers=self.payloadHeader)
            if res.status_code == 200:
                text = res.json()['data']['text']
                with open('decrypt.js', encoding='utf-8') as f1:
                    js_text_2 = f1.read()
                    data_text = execjs.compile(js_text_2).call('B', text)
                    return data_text
        except Exception as e:
            print(e)

    def parseData(self, data):
        '''解析获取数据'''
        data = data['item']
        for dat in data:
            try:
                school = dat['name']
                year = dat['year']
                local_province_name = dat['local_province_name']
                local_batch_name = dat['local_batch_name']
                local_type_name = dat['local_type_name']
                zslx_name = dat['zslx_name']
                min_score = dat['min']
                min_section = dat['min_section']
                proscore = dat['proscore']
                # sg_name = dat['sg_name']
                # sg_info = dat['sg_info']
                print(year, school, local_province_name, local_type_name, local_batch_name, zslx_name, min_score,
                      min_section,
                      proscore)
            except Exception as e:
                print(f'Data lack of {e}', year,school,local_province_name, local_type_name)

    def main(self, count):
        # signsafe = self.getSign()
        # self.payloadData['signsafe'] = signsafe
        # content = self.scrape()
        # self.parseData(content)
        proIds = get_province_id()
        schoolIds = get_school_id()
        dl = []
        dl1 = []
        dl2 = []
        for schoolId in schoolIds:
            dl.append(schoolId)
        for proId in proIds:
            dl1.append(proId)
        for page in range(1, 3):
            dl2.append(page)
        for d in dl:
            for e in dl1:
                 for f in dl2:
                    payloadData = self.getPayloadData([d,e,f])
                    signsafe = self.getSign(payloadData)
                    payloadData['signsafe'] = signsafe
                    # print(payloadData)
                    # time.sleep(2)
                    content = self.scrape(payloadData)
                    if content['item']:
                        self.parseData(content)
                        time.sleep(random.uniform(6, 8))
                        count += 1



S = School()
# p = Pool(5)
# p.apply_async(S.main, args=(count,))
S.main(count)
# p.close()
# p.join()