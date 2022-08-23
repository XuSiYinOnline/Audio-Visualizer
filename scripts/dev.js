const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => {
    
    const contextAudio = new AudioContext();
    const src = contextAudio.createMediaElementSource(audioPlayer);    
    const analyser = contextAudio.createAnalyser();


    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    src.connect(analyser);
    analyser.connect(contextAudio.destination);

    analyser.fftSize = 1024;

    const frequencyAudio = analyser.frequencyBinCount;
    console.log(frequencyAudio);


    const frequencyArray = new Uint8Array(frequencyAudio);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const barWidth = (WIDTH / frequencyArray.length) + 2;
    let barHeight;
    let x;

    function renderFrame() {

        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(frequencyArray);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < frequencyAudio; i++) {

            barHeight = frequencyArray[i];


            let r = 250;
            let g = 50;
            let b = i;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGHT, barWidth, - barHeight);

            x += barWidth + 1;
        }
    }
    renderFrame();
});
