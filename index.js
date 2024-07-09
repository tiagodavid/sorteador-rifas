import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

function drawNumbers(ranges) {
    let allNumbers = [];

    ranges.forEach(interval => {
        console.log(`Interval: ${interval}`)
        let[start, end] = interval;
        console.log(`start: ${start}, end: ${end}`)
        for(let i = start; i <= end; i++) {
            allNumbers.push(i)
        }
    });

    let drawnNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];

    return drawnNumber;
}

fastify.post('/sortear', (req, res) => {
    console.log(`Request: ${req}`)
    const ranges = req.body.ranges;
    console.log(`Ranges: ${ranges}`)
    if(!ranges || !Array.isArray(ranges)) {
        return res.status(400).json({error: 'Intervalos inválidos'})
    }

    const drawnNumber = drawNumbers(ranges);
    res.send({drawnNumber})
})

const start = async () => {
    try {
        await fastify.listen({port: 3000})
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}
start()
