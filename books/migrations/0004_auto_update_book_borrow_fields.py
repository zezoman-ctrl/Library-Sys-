from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_alter_borrow_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='available',
        ),
        migrations.AddField(
            model_name='book',
            name='borrow_price_per_day',
            field=models.DecimalField(default=0.0, max_digits=10, decimal_places=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='borrow',
            name='days',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='borrow',
            name='total_price',
            field=models.DecimalField(default=0.0, max_digits=10, decimal_places=2),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='borrow',
            unique_together=set(),
        ),
    ]
