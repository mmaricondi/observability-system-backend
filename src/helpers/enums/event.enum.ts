enum EVENT_DESCRIPTION_SUCCESS {
    ASAAS = "service api gateway assas stable",
    PAGBANK = "service api pagbank stable",
    CHATGURU = "service api chatguru stable",
    OPENAI = "service api openai stable",
    S3 = "service api s3 stable",
    GUPSHUP = "service api gupshup stable",
    TRISTAR = "service api tristar stable",
    GOOGLE = "service api google stable",
    API_PROD = "service api prod stable",
    API_DEV = "service api dev stable",
    SOCKET = "service api socket stable",
    MICROSSERVICES = "service api microservices stable"
}

enum EVENT_DESCRIPTION_FAILED {
    ASAAS = "service api gateway assas unstable",
    PAGBANK = "service api pagbank unstable",
    CHATGURU = "service api chatguru unstable",
    OPENAI = "service api openai unstable",
    S3 = "service api s3 unstable",
    GUPSHUP = "service api gupshup unstable",
    TRISTAR = "service api tristar unstable",
    GOOGLE = "service api google unstable",
    API_PROD = "service api prod unstable",
    API_DEV = "service api dev unstable",
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