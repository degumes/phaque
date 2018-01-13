function shift(n, dx, dy, dz, arr) {
	for(let i=n; i<arr.length/6; i++){
		arr[6*i] -= dx
		arr[6*i + 1] -= dy
		arr[6*i + 2] -= dz
		arr[6*i + 3] -= dx
		arr[6*i + 4] -= dy
		arr[6*i + 5] -= dz
	}
}
export function hingeFinger(q, finger) {
	let dx = finger[0]
	let dy = finger[1]
	let dz = finger[2]
	
	shift(0, dx, dy, dz, finger)
	
	for(let i=0; i<finger.length/6; i++){
		let x0 = finger[6*i]
		let z0 = finger[6*i+2]
		finger[6*i] = x0*Math.cos(q) - z0*Math.sin(q)
		finger[6*i + 2] = x0*Math.sin(q) + z0*Math.cos(q)
		
		x0 = finger[6*i+3]
		z0 = finger[6*i+5]
		finger[6*i + 3] = x0*Math.cos(q) - z0*Math.sin(q)
		finger[6*i + 5] = x0*Math.sin(q) + z0*Math.cos(q)
	}
	
	shift(0, -dx, -dy, -dz, finger)
}
export function snailFinger(n, rads, finger){
	if(n < finger.length/6) {
		let dx = finger[6*n]
		let dy = finger[6*n+1]
		let dz = finger[6*n+2]
		
		shift(n, dx, dy, dz, finger)
		
		for(let i=n; i<finger.length/6; i++){
			let x0 = finger[6*i]
			let y0 = finger[6*i+1]
			finger[6*i] = x0*Math.cos(rads[n]) - y0*Math.sin(rads[n])
			finger[6*i + 1] = x0*Math.sin(rads[n]) + y0*Math.cos(rads[n])
			
			x0 = finger[6*i+3]
			y0 = finger[6*i+4]
			finger[6*i + 3] = x0*Math.cos(rads[n]) - y0*Math.sin(rads[n])
			finger[6*i + 4] = x0*Math.sin(rads[n]) + y0*Math.cos(rads[n])
		}
		
		shift(n, -dx, -dy, -dz, finger)
		
		snailFinger(n+1, rads, finger)
	}
}
export 	function projection(f) {
	// point of vision [50, 50, -100]
	// plane of projection [0,0,0] + z
	const projected = []
	for(let i=0; i<f.length/3; i++){
		projected.push(100*(f[3*i]-50)/(f[3*i+2]+100) + 50)
		projected.push(100*(f[3*i+1]-50)/(f[3*i+2]+100) + 50)
	}
	return projected
}