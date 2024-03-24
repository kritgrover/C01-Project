import { StyleSheet, Text, Button, View } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import Voice from '@react-native-voice/voice';

export default function VoiceCommand({language, refs}) {
  let [started, setStarted] = useState(false);
  let [words, setWords] = useState("");

  const stopRef = useRef(null);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  useEffect(() => {
    if (words.length > 0 && words[0].includes("stop")) {
      stopRef.current && console.log('inside words', stopRef.current.props, words[0]);

      stopRef.current && stopRef.current.props.onPress();
    }

    refs && refs.map((ref) => {
      console.log('ref trigger', ref.trigger, words);
      if(words.length > 0 && words[0].includes(ref.trigger)) {
        console.log('inside if statement', ref.actual);

        ref.actual.current && ref.actual.current.props.onPress();
        // ref.actual();

        // ref.actual && console.log('inside words', ref.actual.current, words[0]);
        // ref.actual && ref.actual.current.memoizedProps.onClick;
      }
    });
  }, [words]);

  const startSpeechToText = async () => {
    language ? language: 'en-GB'
    await Voice.start(language);
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setWords(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    <View style={styles.container}>
      {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
      {started ? <Button ref={stopRef} title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined}
      <Text>{words}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
