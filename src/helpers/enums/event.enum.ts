enum EVENT_DESCRIPTION_SUCCESS {
    GATEWAY = "service api gateway assas stable",
    CHAT_GURU = "service chat guru stable"
}

enum EVENT_DESCRIPTION_FAILED {
    GATEWAY = "service api gateway assas unstable",
    CHAT_GURU = "service chat guru unstable"
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