import { Component, OnInit, OnDestroy } from '@angular/core';

import { requestServiceAPI } from './requestAPI.service';
import { Observable, Subject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';



@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css']
})
export class CursosListaComponent implements OnInit {

	// REQUEST SERVICE FAZ O REQUEST ATRAVÉS DO METHOD 
	// get() do HttpClient 
	constructor(private service: requestServiceAPI) { }

	// ARMAZENO O DATASOURCE RECEBIDO
	resultAPIrequest: any;

	// METHOD MOSTRA DIV RESULTADOS CARREGADOS
	// RECEBE COMO PARAMETRO O ARRAY COM RESULTADO DO REQUEST DA API 
	mostrarResultadosCarregados (verificarArray) {
		if (verificarArray.length > 0) {
			document.querySelector('#mostraResultados').style.display = 'block';	
		} else {
			document.querySelector('#semResultados').style.display = 'block';
			
		}
	}

	// METHOD RECEBE COMO PARAMETRO A URL QUE DEVE SER CONSULTADA
	realizarAjax (urlTobeCalled:string) {
		
		this.service.getResults(urlTobeCalled)
			.pipe(
				// CONSOLE LOG
				tap(v => console.log('Resultados', v)), 
				// OPERADOR TAKE FAZ O UNSUBSCRIBE DO OBSERVABLE 
				// VALOR (1) PASSADO NO PARAMETRO INDICA QUE SERÁ FEITA APENAS UM REQUEST POR VEZ
				take(1)
				)
			.subscribe(dataSource => this.resultAPIrequest = dataSource, 
				error => { console.log(error)}, () => {
				
				// APENAS VERIFICO SE EXISTEM ITENS NO ARRAY DA RESPOSTA
				// E ASSIM MOSTRO [MSG] ERRO OU LISTA DE RESULTADOS
				this.mostrarResultadosCarregados(this.resultAPIrequest)
			})		
	}

	ngOnInit() {
		
	}
}
