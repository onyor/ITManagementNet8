using Ardalis.Result;
using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;

namespace ITX.Application.Shared
{
    public static class FluentValidationResultExtensions
    {
        public static List<ValidationError> AsErrors(this ValidationResult valResult)
        {
            var resultErrors = new List<ValidationError>();

            foreach (var valFailure in valResult.Errors)
            {
                var identifier = Char.ToLowerInvariant(valFailure.PropertyName[0]) 
                    + valFailure.PropertyName[1..];
                resultErrors.Add(new ValidationError()
                {
                    Severity = FromSeverity(valFailure.Severity),
                    ErrorMessage = valFailure.ErrorMessage,
                    Identifier = identifier
                });
            }

            return resultErrors;
        }

        public static ValidationSeverity FromSeverity(Severity severity)
        {
            switch (severity)
            {
                case Severity.Error: return ValidationSeverity.Error;
                case Severity.Warning: return ValidationSeverity.Warning;
                case Severity.Info: return ValidationSeverity.Info;
                default: throw new ArgumentOutOfRangeException(nameof(severity), "Unexpected Severity");
            }
        }
    }
}