import { IRuleResult } from "@stoplight/spectral";
import { IDiagnostic, DiagnosticSeverity } from '@stoplight/types';
import * as vscode from 'vscode';

export const groupWarningsBySource = function(warnings: IRuleResult[], defaultSource: string) {
    const resultBag = new Map<string, IRuleResult[]>();
    resultBag.set(defaultSource, []);
    warnings.forEach((warning) => {
        const source = warning.source || defaultSource;
        if (!resultBag.has(source)) {
          resultBag.set(source, []);
        }
        resultBag.get(source)!.push(warning);
    });
    return resultBag;
};

export const ourSeverity = function(spectralSeverity: IDiagnostic["severity"]) {
	if (spectralSeverity === DiagnosticSeverity.Error) {
		return vscode.DiagnosticSeverity.Error;
	}
	if (spectralSeverity === DiagnosticSeverity.Warning) {
		return vscode.DiagnosticSeverity.Warning;
	}
	if (spectralSeverity === DiagnosticSeverity.Information) {
		return vscode.DiagnosticSeverity.Information;
	}
	return vscode.DiagnosticSeverity.Hint;
};