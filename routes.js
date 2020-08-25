const checksum_lib = require('./paytm/checksum/checksum')

const port = 3000

module.exports=(app)=>{
	app.get('/payments',(req,res)=>{
		let params ={}
		params['MID'] = 'QDSYba40737658354727',
		params['WEBSITE'] = 'WEBSTAGING',
		params['CHANNEL_ID'] = 'WEB',
		params['INDUSTRY_TYPE_ID'] = 'Retail',
		params['ORDER_ID'] = 'ORD001',
		params['CUST_ID'] = 'CUST001',
		params['TXN_AMOUNT'] = '1',
		params['CALLBACK_URL'] = 'http://localhost:'+port+'/callback',
		params['EMAIL'] = 'xyz@gmail.com',
		params['MOBILE_NO'] = '9696531453'

		checksum_lib.genchecksum(params,'VIotF2i&Ybk51dc9',function(err,checksum){
			let txn_url="https://securegw-stage.paytm.in/order/process"

			let form_fields=""

			for(x in params){
				form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"
			}
			form_fields+="<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' />"

			var html ='<html><body><center><h1>Please wait! Do not Refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
            res.writeHead(200,{'Content-Type' : 'text/html'})
     		res.write(html)
     		res.end()
     		})
	})
}