function none(){}

function signalProcess ( ...calls ) {
	let ed = false
	return function signalTriggers (e) {
		calls[2*ed + e]()
		ed = e
	}
}

export default function genProcessTriggers({regular=none, onpush=none, onrelease=none, holding=none}) {
	return signalProcess(regular, onpush, onrelease, holding)
}