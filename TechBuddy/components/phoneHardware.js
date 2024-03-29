import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import phoneImage from "../assets/phoneImage.jpg";
import { useNavigation } from "@react-navigation/native";
import Translate from "./Translate";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";

const Hardware = function () {
  const navigate = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isBold, setIsBold] = useState("");

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync(
          "selectedLanguage"
        );
        if (savedLanguage) {
          console.log(
            "Selected language: (in LanguageChange.js) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily) {
          console.log("Font family:", savedFontFamily);
          setFontFamily(savedFontFamily);
        } else {
          setFontFamily("Arial");
        }

        const savedFontSize = await SecureStore.getItemAsync("fontSize");
        if (
          savedFontSize !== null &&
          savedFontSize !== "" &&
          savedFontSize !== "null"
        ) {
          console.log("Font size:", savedFontSize);
          setFontSize(Number(savedFontSize));
        } else {
          setFontSize(16);
        }

        const savedIsBold = await SecureStore.getItemAsync("isBold");
        if (savedIsBold) {
          console.log("Is bold:", savedIsBold);
          setIsBold(savedIsBold);
        } else {
          setIsBold(false);
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };

    loadSavedLanguage();
  }, []);

  const navigateToPasswordManager = () => {
    navigate.navigate("PasswordManager");
  };

  const navigateToAccount = () => {
    navigate.navigate("Settings");
  };

  const navigateToHome = () => {
    navigate.navigate("HomeScreen");
  };

  const navigateToTipsHome = () => {
    navigate.navigate("TipsMenu");
  };

  const textStrings = {
    en: {
      back: "Back",
      preText: "Let's look at your phone. While every phone is different, every phone will have similar features.",
      volumeText: "Every phone will have a set of 3 buttons. 2 buttons will be grouped together, and 1 button will be seperate.",
      volumeText2: "The 2 grouped together buttons are volume buttons. One will increase the volume, up to the phone's max volume, and one will decrease the volume, down to no noise. You may press the button to increase or decrease the volume by one level, or hold the button to increase or decrease the volume by many levels.",
      powerText: "The seperate button is a power button. When the phone is off, this button can be pressed to turn the phone on. When the phone is on, pressing the button will turn the phone off. Holding this button will provide several options like shutting down the phone permanently to save battery and restarting the phone.",
      powerText2: "If the phone is permanently turned off, hold the power button to power up the phone and start it up again.",
      chargingText: "The bottom of your phone has a charging port. Your phone can either use an Android charger (usually if your phone is older) or a USBC charger (if your phone is newer). To charge your phone, connect the charger to this port. Make sure you have the correct charger for your phone and that the charger is oriented the correct way. Do not force the charger cable into the port if it does not go in naturally. This could damage your phone.",
      auxText: "On your phone, there may also be a circular hole. This is an AUX port. This is a fancy way to say that this is a place to connect any audio device, like headphones or a stereo, to play music that your phone would emit, instead of from your phone to begin with.",
    },
    fr: {
      back: "Retour",
      preText: "Regardons votre téléphone. Bien que chaque téléphone soit différent, chaque téléphone aura des fonctionnalités similaires.",
      volumeText: "Chaque téléphone aura un ensemble de 3 boutons. 2 boutons seront regroupés et 1 bouton sera séparé.",
      volumeText2: "Les 2 boutons regroupés sont des boutons de volume. L'un augmentera le volume, jusqu'au volume maximal du téléphone, et l'autre diminuera le volume, jusqu'à aucun bruit. Vous pouvez appuyer sur le bouton pour augmenter ou diminuer le volume d'un niveau, ou maintenir le bouton pour augmenter ou diminuer le volume de plusieurs niveaux.",
      powerText: "Le bouton séparé est un bouton d'alimentation. Lorsque le téléphone est éteint, ce bouton peut être pressé pour allumer le téléphone. Lorsque le téléphone est allumé, appuyer sur le bouton éteindra le téléphone. Maintenir ce bouton fournira plusieurs options comme éteindre le téléphone de manière permanente pour économiser la batterie et redémarrer le téléphone.",
      powerText2: "Si le téléphone est éteint de manière permanente, maintenez le bouton d'alimentation pour allumer le téléphone et le démarrer à nouveau.",
      chargingText: "Le bas de votre téléphone a un port de charge. Votre téléphone peut utiliser un chargeur Android (généralement si votre téléphone est plus ancien) ou un chargeur USBC (si votre téléphone est plus récent). Pour charger votre téléphone, connectez le chargeur à ce port. Assurez-vous d'avoir le bon chargeur pour votre téléphone et que le chargeur est orienté dans le bon sens. Ne forcez pas le câble du chargeur dans le port s'il ne rentre pas naturellement. Cela pourrait endommager votre téléphone.",
      auxText: "Sur votre téléphone, il peut également y avoir un trou circulaire. C'est un port AUX. C'est un moyen élégant de dire que c'est un endroit pour connecter n'importe quel appareil audio, comme des écouteurs ou une chaîne stéréo, pour jouer de la musique que votre téléphone émettrait, au lieu de votre téléphone pour commencer.",
    },
    es: {
      back: "Atrás",
      preText: "Veamos tu teléfono. Si bien cada teléfono es diferente, cada teléfono tendrá características similares.",
      volumeText: "Cada teléfono tendrá un conjunto de 3 botones. 2 botones estarán agrupados y 1 botón estará separado.",
      volumeText2: "Los 2 botones agrupados son botones de volumen. Uno aument ará el volumen, hasta el volumen máximo del teléfono, y otro disminuirá el volumen, hasta que no haya ruido. Puede presionar el botón para aumentar o disminuir el volumen en un nivel, o mantener presionado el botón para aumentar o disminuir el volumen en varios niveles.",
      powerText: "El botón separado es un botón de encendido. Cuando el teléfono está apagado, se puede presionar este botón para encender el teléfono. Cuando el teléfono está encendido, presionar el botón apagará el teléfono. Mantener presionado este botón proporcionará varias opciones como apagar el teléfono permanentemente para ahorrar batería y reiniciar el teléfono.",
      powerText2: "Si el teléfono está apagado permanentemente, mantenga presionado el botón de encendido para encender el teléfono y volver a iniciarlo.",
      chargingText: "La parte inferior de su teléfono tiene un puerto de carga. Su teléfono puede usar un cargador de Android (generalmente si su teléfono es más antiguo) o un cargador USBC (si su teléfono es más nuevo). Para cargar su teléfono, conecte el cargador a este puerto. Asegúrese de tener el cargador correcto para su teléfono y de que el cargador esté orientado en la dirección correcta. No fuerce el cable del cargador en el puerto si no entra naturalmente. Esto podría dañar su teléfono.",
      auxText: "En su teléfono, también puede haber un agujero circular. Este es un puerto AUX. Esta es una forma elegante de decir que este es un lugar para conectar cualquier dispositivo de audio, como auriculares o un estéreo, para reproducir música que su teléfono emitiría, en lugar de desde su teléfono para empezar.",
    },
    ch: {
      back: "回去",
      preText: "让我们看看你的手机。虽然每部手机都不同，但每部手机都会有类似的功能。",
      volumeText: "每部手机都有一组3个按钮。 2个按钮将被分组在一起，1个按钮将被分开。",
      volumeText2: "分组在一起的2个按钮是音量按钮。 一个会增加音量，直到手机的最大音量，另一个会减小音量，直到没有噪音。 您可以按下按钮逐级增加或减少音量，或按住按钮逐级增加或减少音量。",
      powerText: "分开的按钮是电源按钮。 当手机关闭时，可以按下此按钮以打开手机。 当手机打开时，按下按钮将关闭手机。 按住此按钮将提供几个选项，例如永久关闭手机以节省电池电量并重新启动手机。",
      powerText2: "如果手机永久关闭，请按住电源按钮以启动手机并重新启动。",
      chargingText: "您的手机底部有一个充电口。 您的手机可以使用Android充电器（通常是如果您的手机较旧）或USBC充电器（如果您的手机较新）。 要为手机充电，请将充电器连接到此端口。 确保您有正确的充电器，并且充电器的方向正确。 如果充电器电缆不自然地插入端口，请不要强行插入。 这可能会损坏您的手机。",
      auxText: "在您的手机上，可能还有一个圆形孔。 这是一个AUX端口。 这是一个花哨的说法，即这是一个连接任何音频设备的地方，例如耳机或立体声，以播放您的手机发出的音乐，而不是从您的手机开始。",
    },
    ru: {
      back: "назад",
      preText: "Давайте посмотрим на ваш телефон. Хотя каждый телефон разный, у каждого телефона будут похожие функции.",
      volumeText: "У каждого телефона будет набор из 3 кнопок. 2 кнопки будут сгруппированы вместе, а 1 кнопка будет отдельной.",
      volumeText2: "2 сгруппированные кнопки - это кнопки громкости. Одна увеличит громкость до максимального уровня телефона, а другая уменьшит громкость до отсутствия шума. Вы можете нажать на кнопку, чтобы увеличить или уменьшить громкость на один уровень, или удерживать кнопку, чтобы увеличить или уменьшить громкость на несколько уровней.",
      powerText: "Отдельная кнопка - это кнопка включения. Когда телефон выключен, эту кнопку можно нажать, чтобы включить телефон. Когда телефон включен, нажатие кнопки выключит телефон. Удерживание этой кнопки предоставит несколько вариантов, таких как окончательное выключение телефона для экономии заряда батареи и перезапуск телефона.",
      powerText2: "Если телефон окончательно выключен, удерживайте кнопку включения, чтобы включить телефон и снова запустить его.",
      chargingText: "Снизу вашего телефона есть разъем для зарядки. Ваш телефон может использовать зарядное устройство Android (обычно, если ваш телефон старый) или зарядное устройство USBC (если ваш телефон новый). Чтобы зарядить телефон, подключите зарядное устройство к этому порту. Убедитесь, что у вас есть правильное зарядное устройство для вашего телефона и что зарядное устройство ориентировано правильно. Не вставляйте кабель зарядного устройства в разъем силой, если он не входит естественно. Это может повредить ваш телефон.",
      auxText: "На вашем телефоне также может быть круглое отверстие. Это AUX-порт. Это изысканный способ сказать, что это место для подключения любого аудиоустройства, такого как наушники или стерео, для воспроизведения музыки, которую ваш телефон излучает, вместо того чтобы начинать с вашего телефона.",
    },
    ar: {
      back: "عودة",
      preText: "لنلق نظرة على هاتفك. على الرغم من أن كل هاتف مختلف ، إلا أن كل هاتف سيحتوي على ميزات مماثلة.",
      volumeText: "سيحتوي كل هاتف على مجموعة من 3 أزرار. سيتم تجميع 2 أزرار معًا ، وسيتم فصل زر واحد.",
      volumeText2: "الأزرار المجمعة معًا هي أزرار الصوت. سيزيد أحدهما من الصوت إلى الحد الأقصى للهاتف ، وسيقلل الآخر من الصوت إلى عدم وجود ضجيج. يمكنك الضغط على الزر لزيادة أو تقليل الصوت بمستوى واحد ، أو الاستمرار في الضغط على الزر لزيادة أو تقليل الصوت بعدة مستويات.",
      powerText: "الزر المنفصل هو زر الطاقة. عندما يكون الهاتف مغلقًا ، يمكن الضغط على هذا الزر لتشغيل الهاتف. عندما يكون الهاتف مشغلًا ، سيؤدي الضغط على الزر إلى إيقاف تشغيل الهاتف. سيوفر الاستمرار في الضغط على هذا الزر عدة خيارات مثل إيقاف تشغيل الهاتف بشكل دائم لتوفير البطارية وإعادة تشغيل الهاتف.",
      powerText2: "إذا تم إيقاف تشغيل الهاتف بشكل دائم ، فاستمر في الضغط على زر الطاقة لتشغيل الهاتف وتشغيله مرة أخرى.",
      chargingText: "في الجزء السفلي من هاتفك ، هناك منفذ شحن. يمكن أن يستخدم هاتفك شاحن Android (عادةً إذا كان هاتفك قديمًا) أو شاحن USBC (إذا كان هاتفك جديدًا). لشحن هاتفك ، قم بتوصيل الشاحن بهذا المنفذ. تأكد من أن لديك الشاحن الصحيح لهاتفك وأن الشاحن موجه بالطريقة الصحيحة. لا تقوم بفرض كابل الشاحن في المنفذ إذا لم يدخل بشكل طبيعي. قد يتسبب ذلك في تلف هاتفك.",
      auxText: "على هاتفك ، قد يكون هناك أيضًا ثقب دائري. هذا هو منفذ AUX. هذه هي طريقة أنيقة للقول إن هذا هو مكان لتوصيل أي جهاز صوتي ، مثل سماعات الرأس أو ستيريو ، لتشغيل الموسيقى التي يصدرها هاتفك ، بدلاً من هاتفك في البداية.",
    },
    hi: {
      back: "वापस",
      preText: "आइए आपके फोन पर एक नजर डालें। हालांकि हर फोन अलग होता है, हर फोन में समान सुविधाएं होती हैं।",
      volumeText: "हर फोन में 3 बटन का सेट होगा। 2 बटन एक साथ ग्रुप किए जाएंगे, और 1 बटन अलग होगा।",
      volumeText2: "एक साथ ग्रुप किए गए 2 बटन वॉल्यूम बटन होते हैं। एक बटन वॉल्यूम बढ़ाएगा, फोन के अधिकतम वॉल्यूम तक, और एक बटन वॉल्यूम को कम करेगा, बिना शोर के। आप बटन पर दबा सकते हैं ताकि वॉल्यूम को एक स्तर बढ़ाएं या कम करें, या बटन को पकड़कर वॉल्यूम को कई स्तरों तक बढ़ाएं या कम करें।",
      powerText: "अलग बटन एक पावर बटन है। जब फोन बंद होता है, इस बटन को दबाकर फोन को ऑन किया जा सकता है। जब फोन ऑन होता है, बटन दबाने से फोन बंद हो जाएगा। इस बटन को पकड़कर फोन को बंद करने के लिए कई विकल्प प्रदान किए जाएंगे जैसे कि बैटरी बचाने के लिए फोन को स्थायी रूप से बंद करना और फोन को फिर से शुरू करना।",
      powerText2: "अगर फोन स्थायी रूप से बंद है, तो फोन को चालू करने और फिर से शुरू करने के लिए पावर बटन को पकड़ें।",
      chargingText: "आपके फोन के नीचे एक चार्जिंग पोर्ट है। आपका फोन एंड्रॉइड चार्जर (सामान्यत: यदि आपका फोन पुराना है) या यूएसबीसी चार्जर (यदि आपका फोन नया है) का उपयोग कर सकता है। अपने फोन को चार्ज करने के लिए, इस पोर्ट पर चार्जर कनेक्ट करें। सुनिश्चित करें कि आपके फोन के लिए सही चार्जर है और चार्जर सही तरीके से ओरिएंटेड है। अगर चार्जर केबल को पोर्ट में जबरदस्ती न डालें तो इसे नष्ट कर सकता है। यह आपके फोन को नुकसान पहुंचा सकता है।",
      auxText: "आपके फोन पर एक वृत्ताकार छिद्र भी हो सकता है। यह एक एयूक्स पोर्ट है। यह एक शैलीशील तरीका है कि यह एक स्थान है जहां किसी भी ऑडियो उपकरण, जैसे हेडफोन या स्टीरियो, को कनेक्ट करने के लिए है, ताकि यह आपके फोन द्वारा उत्पन्न संगीत को बजाए, बिना आपके फोन से पहले।",
    },
    ja: {
      back: "バック",
      preText: "あなたの電話を見てみましょう。 すべての電話が異なるため、すべての電話には似たような機能があります。",
      volumeText: "すべての電話には3つのボタンがあります。 2つのボタンがグループ化され、1つのボタンが分離されます。",
      volumeText2: "グループ化された2つのボタンは音量ボタンです。 1つは音量を最大にして、もう1つはノイズがなくなるまで音量を下げます。 ボタンを押して音量を1段階増減させるか、ボタンを押し続けて音量を複数段階増減させることができます。",
      powerText: "分離されたボタンは電源ボタンです。 電話がオフの場合、このボタンを押して電話をオンにできます。 電話がオンの場合、ボタンを押すと電話がオフになります。 このボタンを押し続けると、電話を永久にシャットダウンしてバッテリーを節約したり、電話を再起動したりするいくつかのオプションが表示されます。",
      powerText2: "電話が永久にオフになっている場合、電源ボタンを押し続けて電話の電源を入れて再起動します。",
      chargingText: "電話の下部には充電ポートがあります。 電話はAndroid充電器（通常、電話が古い場合）またはUSBC充電器（電話が新しい場合）を使用できます。 電話を充電するには、充電器をこのポートに接続します。 電話に適した正しい充電器を持っていること、充電器が正しい向きになっていることを確認してください。 充電器のケーブルをポートに無理やり押し込まないでください。 これにより電話が損傷する可能性があります。",
      auxText: "電話には円形の穴がある場合があります。 これはAUXポートです。 これは、この場所が、電話が最初に発する音楽を再生するための、ヘッドフォンやステレオなどのオーディオデバイスを接続する場所であるという洒落た言い方です。",
    },
  };

  // Set header options dynamically
  useEffect(() => {
    navigate.setOptions({
      headerTitle: () => (
        <TouchableOpacity onPress={navigateToHome}>
          <Image source={homeIcon} style={styles.homeIcon} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigateToAccount}
          style={styles.headerButton}
        >
          <Image source={accountIcon} style={styles.accountIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={navigateToPasswordManager}
          style={styles.headerButton}
        >
          <Image source={passwordIcon} style={styles.passwordIcon} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ScrollView height="500vh">
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigateToTipsHome}
        >
          <Text
            style={[
              styles.buttonText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].back}
          </Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].preText}
          </Text>
        </View>
        <Image
          alt="Hardware Picture"
          resizeMode="contain"
          source={phoneImage}
          style={{ width: "95%" }}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].volumeText}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].volumeText2}
          </Text>
          {/* <img src={SettingsPicture} alt="Search Image" /> */}
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].powerText}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].powerText2}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].chargingText}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].auxText}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    height: "80%",
    alignItems: "center",
    justifyContent: "top",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  navigateButton: {
    width: 200,
    height: 50,
    backgroundColor: "grey",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  instructionText: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  headerButton: {
    padding: 10,
    marginRight: 10,
  },
  headerButtonText: {
    color: "blue",
    fontSize: 16,
  },
  homeIcon: {
    width: 30,
    height: 30,
  },
  accountIcon: {
    width: 40,
    height: 30,
  },
  passwordIcon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    alignItems: "left",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: 150,
    marginBottom: 20,
  },
});

export default Hardware;
