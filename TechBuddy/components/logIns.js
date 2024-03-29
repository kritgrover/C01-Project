import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  TouchableHighlight,
  Linking,
  Platform,
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Translate from "./Translate";
import homeIcon from "../assets/homeIcon.png";
import accountIcon from "../assets/accountIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useNavigation } from "@react-navigation/native";
import Speak from "./Speak";

const LogInsToApps = function () {
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
        if (savedLanguage !== null && savedLanguage !== "" && savedLanguage !== "null") {
          console.log(
            "Selected language: (in LogIns.js) ",
            savedLanguage
          );
          setSelectedLanguage(savedLanguage);
        } else {
          setSelectedLanguage("en");
        }

        const savedFontFamily = JSON.parse(
          await SecureStore.getItemAsync("fontFamily")
        );

        if (savedFontFamily !== null && savedFontFamily !== "" && savedFontFamily !== "null") {
          console.log("Font family (in LogIns.js):", savedFontFamily);
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
      preText: "Many apps (like this one) will require you to 'Log In' or 'Sign In'. This may seem annoying, but it is an important step to ensure your security and comfort.",
      stepText: "How do you log in to an app? Here is a step by step guide.",
      num1: "1) If you are using an app for the first time, the app will ask you to 'Sign Up'. This means creating an account for your use of an app.",
      num2: "2) If you are asked to 'Sign Up', you will be asked for a Username and Password. Type in a Username and Password. You can use anything for the Username and Password, so make sure you will remember them, or write them down somewhere. Your password is used to secure your account. Many apps will require your password to fulfill certain critera. (Like being a certain size of having special characters) This is to help secure your account",
      num3: "3) Some apps will ask you to Confirm Password. This is to make sure that you typed in the password correctly. Put in the same password as you've done before.",
      num4: "4) Some apps will ask you to Confirm You're Not A Robot. This is because there are robots that can automatically make millions of accounts on websites to do malicious activities on behalf of an individual. They may ask you to click a checkmark or play a small game. Do as they say. Sometimes, several attempts are needed.",
      num5: "5) After making an account, to log in to that account, click the Sign In or Log In option on the app if it shows up. Type the same Username and Password as you did when you made the account. If you forgot your Username or Password, click the option 'Forgot Password'. The app will give you directions on how to get your password back, or maybe reset it to another one.",
      ending: "This may seem tedious, but having an account for an app does a lot. It keeps you secure, and helps those apps tailor content for you. For YouTube for example, YouTube will only show you options related to what you like, like cooking videos, and doesn't show you what you won't like, like motorcycle videos.",
    },
    fr: {
      back: "Retour",
      preText: "De nombreuses applications (comme celle-ci) vous demanderont de 'vous connecter' ou de 'vous inscrire'. Cela peut sembler ennuyeux, mais c'est une étape importante pour garantir votre sécurité et votre confort.",
      stepText: "Comment vous connectez-vous à une application? Voici un guide étape par étape.",
      num1: "1) Si vous utilisez une application pour la première fois, l'application vous demandera de 'vous inscrire'. Cela signifie créer un compte pour votre utilisation d'une application.",
      num2: "2) Si on vous demande de 'vous inscrire', on vous demandera un nom d'utilisateur et un mot de passe. Tapez un nom d'utilisateur et un mot de passe. Vous pouvez utiliser n'importe quoi pour le nom d'utilisateur et le mot de passe, alors assurez-vous de vous en souvenir, ou écrivez-les quelque part. Votre mot de passe est utilisé pour sécuriser votre compte. De nombreuses applications exigeront que votre mot de passe remplisse certains critères. (Comme étant d'une certaine taille ou ayant des caractères spéciaux) Cela aide à sécuriser votre compte",
      num3: "3) Certaines applications vous demanderont de confirmer le mot de passe. Cela permet de vérifier que vous avez bien tapé le mot de passe. Mettez le même mot de passe que celui que vous avez déjà fait.",
      num4: "4) Certaines applications vous demanderont de confirmer que vous n'êtes pas un robot. C'est parce qu'il existe des robots qui peuvent créer automatiquement des millions de comptes sur des sites Web pour effectuer des activités malveillantes au nom d'un individu. Ils peuvent vous demander de cliquer sur une coche ou de jouer à un petit jeu. Faites ce qu'ils disent. Parfois, plusieurs tentatives sont nécessaires.",
      num5: "5) Après avoir créé un compte, pour vous connecter à ce compte, cliquez sur l'option Se connecter ou Connexion sur l'application si elle apparaît. Tapez le même nom d'utilisateur et mot de passe que vous avez utilisé lorsque vous avez créé le compte. Si vous avez oublié votre nom d'utilisateur ou votre mot de passe, cliquez sur l'option 'Mot de passe oublié'. L'application vous donnera des instructions sur la façon de récupérer votre mot de passe, ou peut-être le réinitialiser à un autre.",
      ending: "Cela peut sembler fastidieux, mais avoir un compte pour une application fait beaucoup. Cela vous garde en sécurité et aide ces applications à adapter le contenu pour vous. Par exemple, pour YouTube, YouTube ne vous montrera que des options liées à ce que vous aimez, comme des vidéos de cuisine, et ne vous montrera pas ce que vous n'aimerez pas, comme des vidéos de moto.",
    },
    es: {
      back: "Atrás",
      preText: "Muchas aplicaciones (como esta) le pedirán que 'Inicie sesión' o 'Regístrese'. Esto puede parecer molesto, pero es un paso importante para garantizar su seguridad y comodidad.",
      stepText: "¿Cómo inicias sesión en una aplicación? Aquí tienes una guía paso a paso.",
      num1: "1) Si estás usando una aplicación por primera vez, la aplicación te pedirá que 'Te registres'. Esto significa crear una cuenta para tu uso de una aplicación.",
      num2: "2) Si te piden que 'Te registres', se te pedirá un nombre de usuario y una contraseña. Escribe un nombre de usuario y una contraseña. Puedes usar cualquier cosa para el nombre de usuario y la contraseña, así que asegúrate de recordarlos, o escríbelos en algún lugar. Tu contraseña se utiliza para asegurar tu cuenta. Muchas aplicaciones requerirán que tu contraseña cumpla con ciertos criterios. (Como tener un cierto tamaño o tener caracteres especiales) Esto es para ayudar a asegurar tu cuenta",
      num3: "3) Algunas aplicaciones te pedirán que confirmes la contraseña. Esto es para asegurarte de que has escrito la contraseña correctamente. Pon la misma contraseña que has hecho antes.",
      num4: "4) Algunas aplicaciones te pedirán que confirmes que no eres un robot. Esto se debe a que hay robots que pueden crear automáticamente millones de cuentas en sitios web para realizar actividades maliciosas en nombre de un individuo. Pueden pedirte que hagas clic en una marca de verificación o juegues un pequeño juego. Haz lo que te digan. A veces, se necesitan varios intentos.",
      num5: "5) Después de crear una cuenta, para iniciar sesión en esa cuenta, haz clic en la opción Iniciar sesión en la aplicación si aparece. Escribe el mismo nombre de usuario y contraseña que hiciste cuando creaste la cuenta. Si olvidaste tu nombre de usuario o contraseña, haz clic en la opción '¿Olvidaste tu contraseña?'. La aplicación te dará instrucciones sobre cómo recuperar tu contraseña, o quizás restablecerla a otra.",
      ending: "Esto puede parecer tedioso, pero tener una cuenta para una aplicación hace mucho. Te mantiene seguro y ayuda a esas aplicaciones a adaptar el contenido para ti. Por ejemplo, para YouTube, YouTube solo te mostrará opciones relacionadas con lo que te gusta, como videos de cocina, y no te mostrará lo que no te gustará, como videos de motocicletas.",
    },
    ch: {
      back: "回去",
      preText: "许多应用程序（如此类）将要求您“登录”或“注册”。这可能看起来很烦人，但这是确保您的安全和舒适的重要步骤。",
      stepText: "如何登录应用程序？以下是一步一步的指南。",
      num1: "1)如果您是第一次使用应用程序，应用程序将要求您“注册”。这意味着为您使用应用程序创建一个帐户。",
      num2: "2)如果要求您“注册”，则将要求您提供用户名和密码。输入用户名和密码。您可以使用任何用户名和密码，因此请确保您记住它们，或将它们写在某个地方。您的密码用于保护您的帐户。许多应用程序将要求您的密码满足某些标准。 （例如，具有特定大小或具有特殊字符）这有助于保护您的帐户",
      num3: "3)某些应用程序将要求您确认密码。这是为了确保您正确输入了密码。输入与之前相同的密码。",
      num4: "4)某些应用程序将要求您确认您不是机器人。这是因为有些机器人可以自动在网站上创建数百万个帐户，以代表个人进行恶意活动。他们可能会要求您单击复选标记或玩一个小游戏。按照他们说的做。有时，需要多次尝试。",
      num5: "5)创建帐户后，要登录该帐户，请单击应用程序中的登录或登录选项（如果显示）。输入创建帐户时使用的相同用户名和密码。如果忘记用户名或密码，请单击“忘记密码”选项。应用程序将为您提供有关如何找回密码的说明，或者可能将其重置为其他密码。",
      ending: "这可能看起来很繁琐，但为应用程序创建帐户很重要。它使您保持安全，并帮助这些应用程序为您定制内容。例如，对于YouTube，YouTube只会向您显示与您喜欢的内容相关的选项，例如烹饪视频，并不会向您显示您不喜欢的内容，例如摩托车视频。",
    },
    ru: {
      back: "назад",
      preText: "Многие приложения (например, это) потребуют, чтобы вы 'вошли' или 'зарегистрировались'. Это может показаться раздражающим, но это важный шаг для обеспечения вашей безопасности и комфорта.",
      stepText: "Как вы входите в приложение? Вот пошаговое руководство.",
      num1: "1) Если вы используете приложение впервые, приложение попросит вас 'зарегистрироваться'. Это означает создание учетной записи для использования приложения.",
      num2: "2) Если вас попросят 'зарегистрироваться', вас попросят указать имя пользователя и пароль. Введите имя пользователя и пароль. Вы можете использовать что угодно для имени пользователя и пароля, поэтому убедитесь, что вы их запомните или запишите где-нибудь. Ваш пароль используется для защиты вашей учетной записи. Многие приложения потребуют, чтобы ваш пароль соответствовал определенным критериям. (Например, иметь определенный размер или иметь специальные символы) Это помогает защитить вашу учетную запись",
      num3: "3) Некоторые приложения попросят вас подтвердить пароль. Это сделано для того, чтобы убедиться, что вы правильно ввели пароль. Введите тот же пароль, что и раньше.",
      num4: "4) Некоторые приложения попросят вас подтвердить, что вы не робот. Это связано с тем, что существуют роботы, которые могут автоматически создавать миллионы учетных записей на веб-сайтах для выполнения злонамеренных действий от имени отдельного лица. Они могут попросить вас щелкнуть флажок или сыграть в небольшую игру. Делайте, как они говорят. Иногда требуется несколько попыток.",
      num5: "5) После создания учетной записи для входа в эту учетную запись нажмите на опцию Войти или Войти в приложение, если она появится. Введите то же имя пользователя и пароль, что и при создании учетной записи. Если вы забыли свое имя пользователя или пароль, нажмите на опцию 'Забыли пароль'. Приложение даст вам указания о том, как восстановить ваш пароль или, возможно, сбросить его на другой.",
      ending: "Это может показаться утомительным, но наличие учетной записи для приложения делает многое. Это обеспечивает вашу безопасность и помогает этим приложениям настраивать контент для вас. Например, для YouTube YouTube покажет вам только варианты, связанные с тем, что вам нравится, например, видеорецепты, и не покажет вам то, что вам не понравится, например, видео о мотоциклах.",
    },
    ar: {
      back: "عودة",
      preText: "سيطلب العديد من التطبيقات (مثل هذا) منك 'تسجيل الدخول' أو 'التسجيل'. قد يبدو هذا مزعجًا ، ولكنه خطوة مهمة لضمان أمانك وراحتك.",
      stepText: "كيف تقوم بتسجيل الدخول إلى تطبيق؟ إليك دليل خطوة بخطوة.",
      num1: "1) إذا كنت تستخدم تطبيقًا للمرة الأولى ، سيطلب منك التطبيق 'التسجيل'. يعني هذا إنشاء حساب لاستخدام التطبيق.",
      num2: "2) إذا طُلب منك 'التسجيل' ، سيُطلب منك اسم مستخدم وكلمة مرور. اكتب اسم مستخدم وكلمة مرور. يمكنك استخدام أي شيء لاسم المستخدم وكلمة المرور ، لذلك تأكد من تذكرها ، أو اكتبها في مكان ما. تُستخدم كلمة المرور الخاصة بك لتأمين حسابك. قد تتطلب العديد من التطبيقات كلمة مرورك لتحقيق معايير معينة. (مثل كونها بحجم معين أو احتواء أحرف خاصة) هذا لمساعدة تأمين حسابك",
      num3: "3) قد تطلب بعض التطبيقات منك تأكيد كلمة المرور. يتم ذلك للتأكد من أنك قمت بكتابة كلمة المرور بشكل صحيح. ضع نفس كلمة المرور التي قمت بها من قبل.",
      num4: "4) قد تطلب بعض التطبيقات منك تأكيد أنك لست روبوتًا. يرجع ذلك إلى وجود روبوتات يمكنها إنشاء ملايين الحسابات تلقائيًا على مواقع الويب للقيام بأنشطة خبيثة نيابة عن شخص ما. قد يطلبون منك النقر على علامة الاختيار أو لعب لعبة صغيرة. افعل كما يقولون. في بعض الأحيان ، يتطلب الأمر عدة محاولات.",
      num5: "5) بعد إنشاء حساب ، لتسجيل الدخول إلى هذا الحساب ، انقر فوق الخيار تسجيل الدخول أو تسجيل الدخول في التطبيق إذا ظهر. اكتب نفس اسم المستخدم وكلمة المرور التي استخدمتها عند إنشاء الحساب. إذا نسيت اسم المستخدم أو كلمة المرور الخاصة بك ، انقر فوق الخيار 'نسيت كلمة المرور'. سيقدم لك التطبيق توجيهات حول كيفية استعادة كلمة المرور الخاصة بك ، أو ربما إعادتها إلى أخرى.",
      ending: "قد يبدو هذا مملًا ، ولكن وجود حساب لتطبيق يفعل الكثير. يحافظ على أمانك ، ويساعد تلك التطبيقات على تخصيص المحتوى لك. على سبيل المثال ، بالنسبة إلى YouTube ، سيظهر لك YouTube فقط الخيارات المتعلقة بما تحبه ، مثل مقاطع الطهي ، ولن يظهر لك ما لن تحبه ، مثل مقاطع الدراجات النارية.",
    },
    hi: {
      back: "वापस",
      preText: "कई ऐप्स (जैसे यह एक) आपसे 'लॉग इन' या 'साइन इन' करने के लिए कहेंगे। यह ऊबने लग सकता है, लेकिन यह आपकी सुरक्षा और आराम को सुनिश्चित करने के लिए एक महत्वपूर्ण कदम है।",
      stepText: "ऐप में लॉग इन कैसे करें? यहाँ एक कदम से कदम गाइड है।",
      num1: "1) अगर आप पहली बार किसी ऐप का उपयोग कर रहे हैं, तो ऐप आपसे 'साइन अप' करने के लिए कहेगा। इसका मतलब है किसी ऐप के उपयोग के लिए एक खाता बनाना।",
      num2: "2) अगर आपसे 'साइन अप' करने के लिए कहा जाता है, तो आपसे एक उपयोगकर्ता नाम और पासवर्ड के लिए कहा जाएगा। एक उपयोगकर्ता नाम और पासवर्ड टाइप करें। आप उपयोगकर्ता नाम और पासवर्ड के लिए कुछ भी उपयोग कर सकते हैं, इसलिए सुनिश्चित करें कि आप उन्हें याद रखेंगे, या कहीं लिख देंगे। आपका पासवर्ड आपके खाते को सुरक्षित करने के लिए उपयोग किया जाता है। बहुत से ऐप्स आपके पासवर्ड को कुछ निर्धारित मानदंड पूरा करने के लिए मांगेंगे। (जैसे किसी निश्चित आकार का होना या विशेष वर्ण होना) यह आपके खाते को सुरक्षित करने में मदद करने के लिए है",
      num3: "3) कुछ ऐप्स आपसे पासवर्ड की पुष्टि करने के लिए कहेंगे। यह यह सुनिश्चित करने के लिए है कि आपने पासवर्ड सही तरीके से टाइप किया है। पहले जैसा पासवर्ड डालें।",
      num4: "4) कुछ ऐप्स आपसे पुष्टि करने के लिए कहेंगे कि आप एक रोबोट नहीं हैं। इसका कारण यह है कि रोबोट हैं जो लाखों खातों को स्वचालित रूप से वेबसाइटों पर बना सकते हैं ताकि वे किसी व्यक्ति के लिए दुरुपयोगी गतिविधियां कर सकें। वे आपसे एक चेकमार्क पर क्लिक करने या एक छोटा सा खेल खेलने के लिए कह सकते हैं। जैसे उन्हें कहें। कभी-कभी, कई प्रयासों की आवश्यकता होती है।",
      num5: "5) एक खाता बनाने के बाद, उस खाते में लॉग इन करने के लिए, अगर ऐप में वह विकल्प दिखाई देता है, तो ऐप पर साइन इन या लॉग इन विकल्प पर क्लिक करें। जब आप खाता बनाते समय जैसा ही उपयोगकर्ता नाम और पासवर्ड टाइप करें। अगर आपने अपना उपयोगकर्ता नाम या पासवर्ड भूल गए हैं, तो 'पासवर्ड भूल गए' विकल्प पर क्लिक करें। ऐप आपको आपके पासवर्ड वापस पाने के लिए कैसे दिशानिर्देश देगा, या शायद उसे दूसरे पर रीसेट करने के लिए।",
      ending: "यह ऊबने जैसा लग सकता है, लेकिन ऐप के लिए एक खाता होने से बहुत कुछ होता है। यह आपको सुरक्षित रखता है, और उन ऐप्स को आपके लिए सामग्री अनुकूलित करने में मदद करता है। उदाहरण के लिए, YouTube के लिए, YouTube आपको केवल उन विकल्पों को दिखाएगा जो आपको पसंद हैं, जैसे पकाने के वीडियो, और आपको वह नहीं दिखाएगा जो आपको पसंद नहीं है, जैसे मोटरसाइकिल वीडियो।",
    },
    ja: {
      back: "バック",
      preText: "多くのアプリ（このようなもの）は、 'ログイン'または 'サインイン'を求めます。これは面倒に感じるかもしれませんが、これはあなたのセキュリティと快適さを確保するための重要なステップです。",
      stepText: "アプリにログインする方法は？ステップバイステップガイドはこちらです。",
      num1: "1)アプリを初めて使用する場合、アプリは 'サインアップ'するように求めます。これは、アプリの使用のためのアカウントを作成することを意味します。",
      num2: "2) 'サインアップ'を求められた場合、ユーザー名とパスワードを求められます。ユーザー名とパスワードを入力します。ユーザー名とパスワードには何でも使用できますので、覚えておくか、どこかに書き留めておくことを確認してください。パスワードはアカウントを保護するために使用されます。多くのアプリは、パスワードが特定の基準を満たすように要求します。 （特定のサイズであるか、特殊な文字を含むか）これはアカウントを保護するのに役立ちます",
      num3: "3)一部のアプリは、パスワードを確認するように求めます。これは、パスワードを正しく入力したことを確認するためです。以前と同じパスワードを入力します。",
      num4: "4)一部のアプリは、ロボットでないことを確認するように求めます。これは、個人の代わりに悪意のある活動を行うためにウェブサイトで数百万のアカウントを自動的に作成できるロボットがいるためです。チェックマークをクリックしたり、小さなゲームをしたりするように求められることがあります。彼らが言うことをしてください。時には、何度も試行が必要です。",
      num5: "5)アカウントを作成した後、そのアカウントにログインするには、アプリに 'ログイン'または 'ログイン'オプションが表示される場合はクリックします。アカウントを作成したときと同じユーザー名とパスワードを入力します。ユーザー名またはパスワードを忘れた場合は、 'パスワードを忘れました'オプションをクリックします。アプリは、パスワードを取り戻す方法、または別のパスワードにリセットする方法についての指示を示します。",
      ending: "これは面倒なように思えるかもしれませんが、アプリのアカウントを持つことは多くのことをします。あなたを安全に保ち、それらのアプリがあなたに合わせてコンテンツを調整するのを助けます。たとえば、YouTubeの場合、YouTubeはあなたが好きなものに関連するオプションのみを表示し、あなたが好きでないもの、例えばバイクのビデオを表示しません。",
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
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].stepText}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num1}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num2}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num3}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num4}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].num5}
          </Text>
          <Text
            style={[
              styles.instructionText,
              { fontSize, fontWeight: isBold ? "bold" : "normal", fontFamily },
            ]}
          >
            {textStrings[selectedLanguage].ending}
          </Text>
        </View>
      </View>
      <Speak text={textStrings[selectedLanguage].num1+textStrings[selectedLanguage].num2+textStrings[selectedLanguage].num3+textStrings[selectedLanguage].num4+textStrings[selectedLanguage].num5} language={selectedLanguage === 'ch'? 'zh': selectedLanguage} showText={true}></Speak>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    height: "80%",
    alignItems: "center",
    margin: "auto",
    justifyContent: "top",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
  },
  textContainer: {
    alignItems: "left",
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
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: 150,
    marginBottom: 20,
  },
});

export default LogInsToApps;
