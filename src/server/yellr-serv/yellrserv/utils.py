import json
from pyramid.response import Response

def make_response(resp_dict):

    #print "[DEBUG]"
    #print resp_dict
    #print "\n\nTYPE:\n\n"
    #print type(json.dumps(resp_dict))
    #print '\n'

    resp = Response(json.dumps(resp_dict), content_type='application/json') #, charset='utf8')
    resp.headerlist.append(('Access-Control-Allow-Origin', '*'))
    return resp



