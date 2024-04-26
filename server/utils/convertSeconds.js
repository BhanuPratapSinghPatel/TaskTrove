exports.convertSecondsToDuration=(totalDurationInSeconds)=>{
    let duration=""
    if(totalDurationInSeconds>3600){
        duration=~~(totalDurationInSeconds/3600)+" hr"
        totalDurationInSeconds-=3600*~~(totalDurationInSeconds/3600)
    }
    if(totalDurationInSeconds>60){
        duration=duration+" "+(totalDurationInSeconds/60)+" min"
        totalDurationInSeconds/=60
    }
    return duration
}