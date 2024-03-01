namespace AspNetCore.WorkerSample;
public class Worker : BackgroundService
{
    private Task _executingTask;
    private CancellationTokenSource _cts;
    private readonly ILogger _logger;

    public Worker(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<Worker>();
    }
    public override Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogWarning("Worker service started.");

        _cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        _executingTask = ExecuteAsync(_cts.Token);

        return _executingTask.IsCompleted ? _executingTask : Task.CompletedTask;
    }

    public override Task StopAsync(CancellationToken cancellationToken)
    {
        if (_executingTask == null)
        {
            return Task.CompletedTask;
        }

        _logger.LogWarning("Worker service stopping.");

        _cts.Cancel();

        Task.WhenAny(_executingTask, Task.Delay(-1, cancellationToken)).ConfigureAwait(true);

        cancellationToken.ThrowIfCancellationRequested();

        _logger.LogWarning("Worker service stopped.");

        return Task.CompletedTask;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            Console.WriteLine("Çalýþýyorum : {0}", DateTimeOffset.Now);

            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await Task.Delay(1000, stoppingToken);
        }
    }
}