let t = 0

let c = [
math.complex(math.random(50), math.random(50)), 
math.complex(math.random(50), math.random(50)),
math.complex(math.random(50), math.random(50)), 
math.complex(math.random(50), math.random(50)),
math.complex(math.random(50), math.random(50)), 
math.complex(math.random(50), math.random(50)),
math.complex(0, 0)
]

function print (value) {
  const precision = 2
  console.log(math.format(value, precision))
}

function setup() {
  createCanvas(800, 600)
  background(0)
}

function draw() {
	background(0)
  translate(400, 300)

	t += 0.05

	beginShape()
	for(let t = 0; t <= math.pi * 2; t += 0.04) {
		let cn = F(t)
		stroke('rgb(0, 255, 0)')
		noFill()
		vertex(math.ceil(cn.re), math.ceil(-1 * cn.im))
	}
	endShape()

	let sumarr = []
	let pc = c.slice(0, (c.length - 1) / 2)
	let mc = c.slice((c.length - 1) / 2, c.length - 1)

	sumarr.push(c[c.length - 1])

	for(let i = 0, pci = 0, mci = 0; i < c.length - 1; i++) {

		if(i % 2 == 0) {
			sumarr.push(math.multiply(pc[pci], math.pow(math.e, math.multiply(math.i, (pci + 1) * t))))
			pci++
		} else if(i % 2 == 1) {
			sumarr.push(math.multiply(mc[mci], math.pow(math.e, math.multiply(math.i, -1 * (mci + 1) *t))))
			mci++
		}

		stroke('rgb(255, 255, 255)')
		noFill()

		line(
			math.ceil(sum(sumarr.slice(0, sumarr.length - 1)).re),
			math.ceil(-1 * sum(sumarr.slice(0, sumarr.length - 1)).im),
			math.ceil(sum(sumarr).re),
			math.ceil(-1 * sum(sumarr).im)
		)

		fill('rgb(255, 255, 255)')
		noStroke()

		ellipse(
			math.ceil(sum(sumarr).re),
			math.ceil(-1 * sum(sumarr).im),
			4
		)

		stroke('rgba(255, 255, 255, 0.5)')
		noFill()

		ellipse(
			math.ceil(sum(sumarr.slice(0, sumarr.length - 1)).re), 
			math.ceil(-1 * sum(sumarr.slice(0, sumarr.length - 1)).im),

			2 * math.abs(
				math.subtract(
						sum(sumarr.slice(0, sumarr.length - 1)), 
						sum(sumarr)
					)
				)
			)
		}

	if(t >= 6.28)
		t = 0
}

function F(t) {
		let ret = math.complex(0, 0)

		ret = math.add(ret, c[c.length - 1])

		for (let i = 0, j = 1; i < (c.length - 1) / 2; i++, j++) {
			ret = math.add(ret, 
				math.multiply(c[i], 
					math.pow(math.e, 
						math.multiply(j, 
							math.multiply(math.i, 
								t )))))
		}

		for (let i = (c.length - 1) / 2, j = 1; i < (c.length - 1); i++, j++) {
			ret = math.add(ret, 
				math.multiply(c[i], 
					math.pow(math.e, 
						math.multiply(-1 * j, 
							math.multiply(math.i, 
								t )))))
		}

		return ret
}

function sum(arr) {
	let ret = math.complex(0, 0)
	for (let i = 0; i < arr.length; i++) {
		ret = math.add(ret, arr[i])
	}
	return ret
}