enum EVENT_DESCRIPTION_SUCCESS {
    ASAAS = "service api gateway assas stable",
    PAGBANK = "service api pagbank stable",
    CHATGURU = "service api chatguru stable",
    OPENAI = "service api openai stable",
    S3 = "service api s3 bucket stable",
    GUPSHUP = "service api gupshup stable",
    TRISTAR = "service api tristar stable",
    GOOGLE = "service api google stable",
    API_PROD = "service crm prod stable",
    API_DEV = "service crm dev stable",
    SOCKET = "service api socket stable",
    MICROSSERVICES = "service api microservices stable"
}

enum EVENT_DESCRIPTION_FAILED {
    ASAAS = "Falha ao acessar api de webhooks do asaas",
    PAGBANK = "service api pagbank unstable",
    CHATGURU = "service api chatguru unstable",
    OPENAI = "Falha ao acessar api de ",
    S3 = "service api s3 bucket unstable",
    GUPSHUP = "Falha ao acessar allocated numbers do gupshup",
    TRISTAR = "Falha na autenticação com a api do tristar",
    GOOGLE = "service api google unstable",
    API_PROD = "service crm prod down",
    API_DEV = "service crm dev down",
    SOCKET = "service api socket unstable",
    MICROSSERVICES = "service api microservices unstable"
}

enum EVENT_STATUS {
    success = "up",
    failed = "down"
}

export {
    EVENT_DESCRIPTION_SUCCESS,
    EVENT_DESCRIPTION_FAILED,
    EVENT_STATUS
}