module.exports =  {
     getAppRootUrl(req) {
        return getAppRootUrl( req ) ;
    },
    hrefForCustomerNumber(req, customerNumber) {
        return getAppRootUrl(req) + "/customer/" +  customerNumber ;
    },
    hrefForProductCode(req, productCode) {
        return getAppRootUrl(req) + "/product/" + productCode;
    },
    hrefForOrderNumber(req, orderNumber) {
        return getAppRootUrl(req) + "/order/" + orderNumber;
    }
}

function getAppRootUrl(req) {
    return req.protocol + '://' + req.get('host') ;
}

