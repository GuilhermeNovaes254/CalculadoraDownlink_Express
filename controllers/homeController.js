const homeController = {
  index: (req, res) => {
    let stringDownlink = '';
    res.render('index', {
      stringDownlink,
      title: 'Home'
    });
  },

  forms: (req, res) => {

    //Coleta os dados do formulário
    let {
      speed,
      distance,
      stopDetectionThreshold,
      stopDetectionWindow,
      movingStaticStateTimer,
      aliveMovingStateTimer,
      downlinkFrequency,
      aliveStaticStateTimer,
      broadcastCap
    } = req.body;



    const hexToBinary = (s) => {

      let lookup = {
        '0': '0000',    
        '0': '0000',        '1': '0001',        '2': '0010',        '3': '0011',        '4': '0100',        '5': '0101',
        '6': '0110',        '7': '0111',        '8': '1000',        '9': '1001',        'a': '1010',        'b': '1011',
        'c': '1100',        'd': '1101',        'e': '1110',        'f': '1111',        'A': '1010',        'B': '1011',
        'C': '1100',        'D': '1101',        'E': '1110',        'F': '1111'
      };

      let ret = '';
      for (let i = 0; i < s.length ; i++) {
        ret += lookup[s[i]];
      }
      return ret;
    }

    const BinayToHex = (number) => {
      return parseInt(number, 2).toString(16).toUpperCase();
    }

    //Montagem dos bytes
    let byte0_1 = parseInt('5',10).toString(16) ;
    let byte0_2 = parseInt('00',10).toString(16);

    let byte1 = parseInt(aliveStaticStateTimer,10).toString(16) ;
    if(byte1.length != 2){ byte1 = "0"+byte1};

    let byte2 = parseInt(downlinkFrequency,10).toString(16);
    if(byte2.length != 2){ byte2 = "0"+byte2};

    let byte3_1 = parseInt(speed,10).toString(16) ;
    let byte3_2 = parseInt(broadcastCap,10).toString(16);

    let byte4_1 = parseInt(movingStaticStateTimer,10).toString(16) ;;
    let byte4_2 = parseInt(distance,10).toString(16);
    
      let byte5_1_1 = parseInt(stopDetectionWindow,10).toString(2);
      let byte5_1_2 = parseInt(stopDetectionThreshold,10).toString(2) ;
    
      if(byte5_1_1.length != 2){ byte5_1_1 = "0"+byte5_1_1};
      if(byte5_1_2.length != 2){ byte5_1_2 = "0"+byte5_1_2};
    
    
    let byte5_1 = (parseInt((byte5_1_1 + byte5_1_2),2).toString(16));
    let byte5_2 = parseInt(aliveMovingStateTimer).toString(16);

    let byte6 = "00";
    let byte7 = "10";

    //Monta String
    let stringDownlink = byte0_1 + byte0_2 + byte1 + byte2 + byte3_1 + byte3_2 + byte4_1 + byte4_2 + byte5_1 + byte5_2 + byte6 + byte7;

    console.log('stopDetectionWindow ' +  '   stopDetectionThreshold ' + byte5_1);
    console.log('aliveMovingStateTimer ' + byte5_2);

    console.log(stringDownlink)
    
    res.render('forms', {stringDownlink, title: 'home'});
  }

};

module.exports = homeController;